/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */

 var React = require('react-native');
 var Navigation = require('./ios_views/common/navigation');
 var Book = require('./ios_views/book/book_list');
 var Mine = require('./ios_views/mine/mine');
 var Movie = require('./ios_views/movie/movie');

 var {
   AppRegistry,
   StyleSheet,
   Text,
   View,
   TabBarIOS,
   ScrollView,
   StatusBarIOS
 } = React;

 StatusBarIOS.setHidden(true);
 var DoubanApp = React.createClass({
   getInitialState: function(){
     return {
       selectedTab: '图书'
     };
   },
   render: function() {
     return (
       <TabBarIOS>
         <TabBarIOS.Item
           title="图书"
           selected={this.state.selectedTab === '图书'}
           icon={require('image!book')}
           onPress={() => {
             this.setState({
               selectedTab: '图书'
             });
           }}>
            <Navigation component={Book}/>
         </TabBarIOS.Item>

         <TabBarIOS.Item
           title="电影"
           selected={this.state.selectedTab === '电影'}
           icon={require('image!movie')}
           onPress={() => {
             this.setState({
               selectedTab: '电影'
             });
           }}>
            <Navigation component={Movie}/>
         </TabBarIOS.Item>

         <TabBarIOS.Item
           title="我的"
           selected={this.state.selectedTab === '我的'}
           icon={require('image!about')}
           onPress={() => {
             this.setState({
               selectedTab: '我的'
             });
           }}>
           <Navigation component={Mine}/>
         </TabBarIOS.Item>
       </TabBarIOS>
     );
   }
 });

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

AppRegistry.registerComponent('DoubanApp', () => DoubanApp);
