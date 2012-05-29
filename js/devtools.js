chrome.devtools.panels.create("CodeMirror", "img/mirror32.png", "index.html", function(panel) {
  console.log(JSON.stringify(panel));

  var current = null;

  chrome.devtools.panels.setOpenResourceHandler(function(resource, line) {
    console.log('resource', resource, line);
    resource.getContent(function(content, encoding) {
      console.log('encoding', encoding);
      current = content;
    });
  });

  panel.onShown.addListener(function(window) {
    console.log(window);
    if (current) {
      window.editor.setValue(current);
      current = null;
    }
  });
});

