ResizeDetector is a small library, to detect if the browser window's size has been changed.

To use this library, just import this script file into your html with a "<script type=..." tag and register one or more function that you like to have called, whenever the window has been resized.


Example code:

ResizeDetector.addEventListener(function() {

    alert("The window has been resized");

});