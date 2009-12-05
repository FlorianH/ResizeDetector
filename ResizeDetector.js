/*
* ResizeDetector is a small library, to detect if the browser
* window's size has been changed.
*
* To use this library, just import this script file into
* your html with a "<script type=..." tag and register one
* or more function that you like to have called, whenever
* the window has been resized.
*
* Example code:
*
* ResizeDetector.addEventListener(function() {
*
*     alert("The window has been resized");
* 
* });
*
* DEPENDS ON prototype.js
* 
* Copyright (C) 2009 Florian Herlings (florianherlings.de)
* 
* This program is free software: you can redistribute it and/or modify
* it under the terms of the GNU General Public License as published by
* the Free Software Foundation, either version 3 of the License, or
* (at your option) any later version.
* 
* This program is distributed in the hope that it will be useful,
* but WITHOUT ANY WARRANTY; without even the implied warranty of
* MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
* GNU General Public License for more details.
* 
* You should have received a copy of the GNU General Public License
* along with this program.  If not, see <http://www.gnu.org/licenses/>.
* 
* Version:    0.1
* Date:       05.12.2009
*/
var ResizeDetector = {

  /**
   * When the ResizeDetector detects a change
   * in the window's size, it fires all the
   * functions, stored in this array.
   */
  'eventListeners': new Array(),

  /**
  * The buffer contains a copy of the viewport
  * dimensions. These dimensions are compared to the
  * current viewport dimensions to find out if th
  * window has been resized.
  */
  'buffer': false,

  /**
   * Constructor
   * 
   * Initializes the buffer with the current viewport
   * and starts periodically executing the "check" function
   * 4 times a second (which seems to be a good value).
   */
  'init': function() {
  
    ResizeDetector.buffer = document.viewport.getDimensions();
    new PeriodicalExecuter(ResizeDetector.check, 0.25);
    
  },//init()
  
  
  /**
   * Tries to find out, if the window has been resized.
   * To find out, if the window has been resized it compares the
   * current viewport to the buffered viewport. If it has detected
   * a change, it informs the listener functions and sets the
   * buffer to the new value.
   * This method has to be called periodically, but not __too__
   * often, because that may slow the browser engine down significantly.
   */
  'check': function() {
        
    if ((document.viewport.getDimensions().width != ResizeDetector.buffer.width)
        || (document.viewport.getDimensions().height != ResizeDetector.buffer.height)) {
      
      ResizeDetector.informListeners();
      ResizeDetector.buffer = document.viewport.getDimensions();
      
    }//if
    
  },//check()


  /**
   * Adds a listener function to the eventListeners array.
   */
  'addEventListener': function(fn) {
  
    ResizeDetector.eventListeners.push(fn);
  
  },//addEventListener


  /**
   * Call all registered listeners functions,
   * which are expectede to be stored in the
   * "ResizeDetector.eventListeners" array.
   */
  'informListeners': function() {
        
    ResizeDetector.eventListeners.each(function(listenerFunction) {
      listenerFunction();
    });
      
  }//informListeners()


}//ResizeDetector


//Initialize the ResizeDetector
document.observe("dom:loaded", function() {
  ResizeDetector.init();
});
