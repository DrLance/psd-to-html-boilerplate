for (var index = 0; index <= 5; index++) {
  (function() {
    return setTimeout(() => {
      console.log(index);
    }, 2000);
  })();
}
