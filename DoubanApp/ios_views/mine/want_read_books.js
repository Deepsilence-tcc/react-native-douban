/**
 * Created by edagarli on 16/3/17.
 * https://github.com/edagarli
 */
var React = require('react-native');
var Search = require('./../common/search');
var Util = require('./../common/util');
var ServiceURL = require('./../common/service');
var BookItem = require('./../book/collection_book_item')
var BookDetail = require('./../book/book_detail');
var Header = require('./../common/header');

var {
    StyleSheet,
    Text,
    View,
    ListView,
    Image,
    ScrollView,
    ActivityIndicatorIOS,
    TouchableOpacity
    } = React;

module.exports = React.createClass({
    getInitialState: function () {
        var ds = new ListView.DataSource({rowHasChanged: (r1, r2)=> r1 !== r2});
        return {
            dataSource: ds.cloneWithRows([]),
            show: false
        };
    },
    render: function () {
        return (
            <ScrollView style={styles.flex_1}>
                <View>
                    <Header
                        navigator={this.props.navigator}
                        initObj={{
                        backName: this.props.backName,
                        title: this.props.title
                      }}/>
                </View>
                {
                    this.state.show ?
                        <ListView
                            dataSource = {this.state.dataSource}
                            renderRow={this._renderRow}
                        /> : Util.loading
                }
            </ScrollView>
        );
    },

    componentDidMount: function(){
        this._getData();
    },

    //渲染图书列表项
    _renderRow: function(row){
        return (
            <BookItem row={row} onPress={this._loadPage.bind(this, row.book_id)}/>
        );
    },

    _getData: function(){
        var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        var that = this;
        var baseURL = ServiceURL.want_read_book;
        //开启loading
        this.setState({
            show: false
        });
        Util.get(baseURL, function(data){
            if(!data.collections || !data.collections.length){
                that.setState({
                    show: true
                });
                return alert('没有相应数据');
            }
            var collections = data.collections;
            that.setState({
                dataSource: ds.cloneWithRows(collections),
                show: true
            });
        }, function(err){
            alert(err);
        });
    },
    _loadPage: function(id){
        this.props.navigator.push({
            component: BookDetail,
            passProps:{
                id: id
            }
        });
    }
});

var styles = StyleSheet.create({
    flex_1: {
        flex: 1,
        marginTop: 5
    },
    search: {
        paddingLeft: 5,
        paddingRight: 5,
        height: 45
    },
    btn: {
        width: 50,
        backgroundColor: '#0091FF',
        justifyContent: 'center',
        alignItems: 'center'
    },
    fontFFF: {
        color: '#fff'
    },
    row: {
        flexDirection: 'row'
    }
});

