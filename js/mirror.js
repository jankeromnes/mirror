var marker = "<span style=\"color: #0AF; font-weight: bold;\">%N%</span>";
var editor = CodeMirror(document.body, {
  value: '',
  mode:  'javascript',
  lineNumbers: true,
  lineWrapping: true,
  onGutterClick: function(cm, line) {
    var info = cm.lineInfo(line);
    if (info.markerText) {
      cm.clearMarker(line);
      if (editor.onUnsetBreakpoint) editor.onUnsetBreakpoint(line);
    } else {
      cm.setMarker(line, marker);
      if (editor.onSetBreakpoint) editor.onSetBreakpoint(line);
    }
  }
});
editor.setBreakpoint = function(line) {
  editor.setMarker(line, marker);
};
editor.unsetBreakpoint = function(line) {
  editor.clearMarker(line);
};
