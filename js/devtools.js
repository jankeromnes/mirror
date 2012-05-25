console.log(chrome);

chrome.devtools.panels.create("CodeMirror", "img/mirror32.png", "index.html", function(panel) {
  var button = panel.createStatusBarButton("img/mirror16.png", "le tooltip", false);

  panel.onHidden.addListener(function() {
    console.log('elementPanel.onHidden');
  });

  panel.onSearch.addListener(function(action, queryString) {
    console.log('elementPanel.onSearch:', action, queryString);
  });

  panel.onShown.addListener(function(window) {
    console.log('elementPanel.onShown:', window);
  });

  console.log('panels.create:', panel);
});

chrome.devtools.panels.setOpenResourceHandler(function(resource, line) {

  resource.getContent(function(content, encoding) {
    console.log('resource.getContent:', content, encoding);
  });

  console.log('panels.setOpenResourceHandler:', resource, line); // TODO fix doc
});

chrome.devtools.panels.elements.createSidebarPane("CodeMirror", function (sidebar) {
  //sidebar.setHeight("30ex");

  sidebar.setPage("unfail.html");

  /*sidebar.setExpression('window', 'le roottitle', function() {
    console.log('extensionSidebarPane.setExpression');
  });*/

  sidebar.setObject({le:'object'}, 'le roottitle', function() {
    console.log('extensionSidebarPane.setObject');
  });

  console.log('panels.elements.createSidebarPane:', sidebar);
});


chrome.devtools.panels.elements.onSelectionChanged.addListener(function() {
  console.log('panels.element.onSelectionChanged');
});


