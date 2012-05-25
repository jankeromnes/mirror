var editor = CodeMirror(document.body, {
  value: "function myScript(){return 100;}\n",
  mode:  "javascript",
  lineNumbers: true
});

chrome.devtools.panels.setOpenResourceHandler(function(resource, line) {
  console.log('resource', resource, line);
  resource.getContent(function(content, encoding) {
    console.log('encoding', encoding);
    editor.setValue(content);
  });
});

