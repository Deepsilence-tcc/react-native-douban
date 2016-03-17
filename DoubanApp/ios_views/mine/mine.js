var React = require('react-native');
var Util = require('./../common/util');
var ServiceURL = require('./../common/service');
var HasRead = require('./has_read_books');
var WantRead = require('./want_read_books');
var WebView = require('./../common/webView');

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
    render: function () {
        var urls = [ServiceURL.has_read_book, ServiceURL.want_read_book, 'https://github.com/edagarli', 'https://github.com/edagarli/React-Douban'];
        var items = ['我读过的书', '我想读的书', '关于我',  'Github'];
        var components = [HasRead, WantRead, WebView, WebView];
        var JSXDOM = [];
        for (var i in items) {
            JSXDOM.push(
                <TouchableOpacity key={items[i]} onPress={this._loadPage.bind(this, components[i], items[i], urls[i])}>
                    <View style={[styles.item, {flexDirection:'row'}]}>
                        <Text style={[styles.font,{flex:1}]}>{items[i]}</Text>
                    </View>
                </TouchableOpacity>
            );
        }
        return (
            <ScrollView style={styles.container}>
                <View style={styles.wrapper}>
                    {JSXDOM}
                </View>
            </ScrollView>
        );
    },
    _loadPage: function(component, title, url){
        this.props.navigator.push({
            component: component,
            passProps:{
                backName: '我的',
                title: title,
                url: url
            }
        });
    },
});


var styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5F5F5',
    },
    item: {
        height: 40,
        justifyContent: 'center',
        borderTopWidth: Util.pixel,
        borderTopColor: '#ddd',
        backgroundColor: '#fff',
        alignItems: 'center',
    },
    font: {
        fontSize: 15,
        marginLeft: 5,
        marginRight: 10,
    },
    wrapper: {
        marginTop: 30,
    },
    tag: {
        marginLeft: 10,
        fontSize: 16,
        fontWeight: 'bold'
    }
});