var someCallback = function(data) {
  console.log('got some data:', data);
}

var useCallback = function(cb) {
  cb('the data i wanted to get');
}

useCallback(someCallback);

