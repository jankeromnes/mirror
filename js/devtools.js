chrome.devtools.inspectedWindow.onResourceContentCommitted.addListener(function(resource, content) {
  console.log('resource content committed', resource, content);
});

chrome.devtools.panels.create('CodeMirror', 'img/mirror32.png', 'index.html', function(panel) {
  console.log('panel',JSON.stringify(panel),panel);

  var res = null,
      editor = null,
      buffer = null;

  function load(content, line) {
    if (editor) {
      console.log('loading', content, line);
      editor.setValue(content);
      editor.setCursor({line:line||0, ch:0});
    } else {
      buffer = {content:content, line:line};
      console.log('buffering load', buffer);
    }
  }

  function save() {
    if (editor) {
      console.log('saving', editor.getValue());
      res.setContent(editor.getValue(), true, function(status){
        if (status && status.isError) console.error('Could\'t save Resource:', status);
        else console.log('Resource saved!');
      });
    }
  }

  chrome.devtools.panels.setOpenResourceHandler(function(resource, line) {
    console.log('open resource', resource, line);

    res = resource;
    res.getContent(function(content, encoding) {
      console.log('encoding', encoding);
      load(content, line);
    });

    panel.show();
  });

  panel.onShown.addListener(function(window) {
    if (!editor) {
      console.log('setting editor', window.editor);
      editor = window.editor;
    }
    if (buffer) {
      console.log('loading buffer');
      load(buffer.content, buffer.line);
      buffer = null;
    }
  });

  panel.onSearch.addListener(function(action, query) {
    console.log('search',action,query);
    if (editor) {
      var cursor = editor.getSearchCursor(query, null, true);
      cursor.findNext();
    }
  });

  //var buttonsave = panel.createStatusBarButton('img/mirror16.png', 'Save', false);
  //buttonsave.onClicked.addListener(save);

  var buttonres = panel.createStatusBarButton('img/mirror16.png', 'Resources', false);
  buttonres.onClicked.addListener(function() {
    chrome.devtools.inspectedWindow.getResources(function(res){
      console.log(res);
    });
  });
});

