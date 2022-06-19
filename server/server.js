import express from 'express';
import bodyParser from 'body-parser';
import state from './state.js';
import cors from 'cors';

const app = express();
app.use(bodyParser.json());
app.use(cors());
let cachedState;

app.get('/initializeApp', function(req, res){
  var fullUrl = req.protocol + '://' + req.get('host') + req.originalUrl;
  console.log(fullUrl);
  res.redirect(301, 'http://localhost:4200/splash');
});

app.get('/v1/getRouteData', function(req, res){
  let {currRoute, routeMapping, routes} = cachedState;
  if (!currRoute){
    currRoute = routes[0];
    //set curr route if we don't have one
    cachedState.currRoute = currRoute;

  }
  const showNext = cachedState.routeMapping[currRoute].next !== null ? true: false;
  const showPrev = cachedState.routeMapping[currRoute].prev !== null ? true: false;
  //give back form data
  res.json({formData: routeMapping[currRoute].formData, showNext, showPrev});

});

app.post('/v1/postRouteData', function(req, res){
  const {body} = req;
  const { currRoute, formData, forward} = body;
  const routeNode = cachedState.routeMapping[currRoute];
  const nextRoute = forward ? routeNode.next : routeNode.prev;
  //set form data
  cachedState.routeMapping[currRoute].formData = formData;
  //set next route
  cachedState.currRoute = nextRoute;

  //give back next route
  res.json({nextRoute: cachedState.currRoute});


});

app.listen(3000, function() {
  console.log('express app listening on port 3000!');
  cachedState =  {...state};
});
