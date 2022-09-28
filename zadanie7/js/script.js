// Using http://johnny.github.io/jquery-sortable for sorting
!function(e,x,h){function r(a,b){var c=Math.max(0,a[0]-b[0],b[0]-a[1]),d=Math.max(0,a[2]-b[1],b[1]-a[3]);return c+d}function s(a,b,c,d){for(var f=a.length,d=d?"offset":"position",c=c||0;f--;){var k=a[f].el?a[f].el:e(a[f]),i=k[d]();i.left+=parseInt(k.css("margin-left"),10);i.top+=parseInt(k.css("margin-top"),10);b[f]=[i.left-c,i.left+k.outerWidth()+c,i.top-c,i.top+k.outerHeight()+c]}}function l(a,b){var c=b.offset();return{left:a.left-c.left,top:a.top-c.top}}function t(a,b,c){for(var b=[b.left,b.top],
  c=c&&[c.left,c.top],d,f=a.length,e=[];f--;)d=a[f],e[f]=[f,r(d,b),c&&r(d,c)];return e=e.sort(function(a,b){return b[1]-a[1]||b[2]-a[2]||b[0]-a[0]})}function m(a){this.options=e.extend({},j,a);this.containers=[];this.scrollProxy=e.proxy(this.scroll,this);this.dragProxy=e.proxy(this.drag,this);this.dropProxy=e.proxy(this.drop,this);this.options.parentContainer||(this.placeholder=e(this.options.placeholder),a.isValidTarget||(this.options.isValidTarget=h))}function n(a,b){this.el=a;this.options=e.extend({},
  v,b);this.group=m.get(this.options);this.rootGroup=this.options.rootGroup=this.options.rootGroup||this.group;this.parentContainer=this.options.parentContainer;this.handle=this.rootGroup.options.handle||this.rootGroup.options.itemSelector;this.el.on(o.start,this.handle,e.proxy(this.dragInit,this));this.options.drop&&this.group.containers.push(this)}var o,v={drag:!0,drop:!0,exclude:"",nested:!0,vertical:!0},j={afterMove:function(){},containerPath:"",containerSelector:"ol, ul",distance:0,handle:"",itemPath:"",
  itemSelector:"li",isValidTarget:function(){return!0},onCancel:function(){},onDrag:function(a,b){a.css(b)},onDragStart:function(a){a.css({height:a.height(),width:a.width()});a.addClass("dragged");e("body").addClass("dragging")},onDrop:function(a){a.removeClass("dragged").removeAttr("style");e("body").removeClass("dragging")},onMousedown:function(a,b){b.preventDefault()},placeholder:'<li class="placeholder"/>',pullPlaceholder:!0,serialize:function(a,b,c){a=e.extend({},a.data());if(c)return b;b[0]&&
  (a.children=b,delete a.subContainer);delete a.sortable;return a},tolerance:0},p={},u=0,w={left:0,top:0,bottom:0,right:0};o={start:"touchstart.sortable mousedown.sortable",drop:"touchend.sortable touchcancel.sortable mouseup.sortable",drag:"touchmove.sortable mousemove.sortable",scroll:"scroll.sortable"};m.get=function(a){p[a.group]||(a.group||(a.group=u++),p[a.group]=new m(a));return p[a.group]};m.prototype={dragInit:function(a,b){this.$document=e(b.el[0].ownerDocument);b.enabled()?(this.toggleListeners("on"),
  this.item=e(a.target).closest(this.options.itemSelector),this.itemContainer=b,this.setPointer(a),this.options.onMousedown(this.item,a,j.onMousedown)):this.toggleListeners("on",["drop"]);this.dragInitDone=!0},drag:function(a){if(!this.dragging){if(!this.distanceMet(a))return;this.options.onDragStart(this.item,this.itemContainer,j.onDragStart);this.item.before(this.placeholder);this.dragging=!0}this.setPointer(a);this.options.onDrag(this.item,l(this.pointer,this.item.offsetParent()),j.onDrag);var b=
  a.pageX,a=a.pageY,c=this.sameResultBox,d=this.options.tolerance;if(!c||c.top-d>a||c.bottom+d<a||c.left-d>b||c.right+d<b)this.searchValidTarget()||this.placeholder.detach()},drop:function(){this.toggleListeners("off");this.dragInitDone=!1;if(this.dragging){if(this.placeholder.closest("html")[0])this.placeholder.before(this.item).detach();else this.options.onCancel(this.item,this.itemContainer,j.onCancel);this.options.onDrop(this.item,this.getContainer(this.item),j.onDrop);this.clearDimensions();this.clearOffsetParent();
  this.lastAppendedItem=this.sameResultBox=h;this.dragging=!1}},searchValidTarget:function(a,b){a||(a=this.relativePointer||this.pointer,b=this.lastRelativePointer||this.lastPointer);for(var c=t(this.getContainerDimensions(),a,b),d=c.length;d--;){var f=c[d][0];if(!c[d][1]||this.options.pullPlaceholder)if(f=this.containers[f],!f.disabled){if(!this.$getOffsetParent())var e=f.getItemOffsetParent(),a=l(a,e),b=l(b,e);if(f.searchValidTarget(a,b))return!0}}this.sameResultBox&&(this.sameResultBox=h)},movePlaceholder:function(a,
  b,c,d){var f=this.lastAppendedItem;if(d||!(f&&f[0]===b[0]))b[c](this.placeholder),this.lastAppendedItem=b,this.sameResultBox=d,this.options.afterMove(this.placeholder,a)},getContainerDimensions:function(){this.containerDimensions||s(this.containers,this.containerDimensions=[],this.options.tolerance,!this.$getOffsetParent());return this.containerDimensions},getContainer:function(a){return a.closest(this.options.containerSelector).data("sortable")},$getOffsetParent:function(){if(this.offsetParent===
  h){var a=this.containers.length-1,b=this.containers[a].getItemOffsetParent();if(!this.options.parentContainer)for(;a--;)if(b[0]!=this.containers[a].getItemOffsetParent()[0]){b=!1;break}this.offsetParent=b}return this.offsetParent},setPointer:function(a){a={left:a.pageX,top:a.pageY};if(this.$getOffsetParent()){var b=l(a,this.$getOffsetParent());this.lastRelativePointer=this.relativePointer;this.relativePointer=b}this.lastPointer=this.pointer;this.pointer=a},distanceMet:function(a){return Math.max(Math.abs(this.pointer.left-
  a.pageX),Math.abs(this.pointer.top-a.pageY))>=this.options.distance},scroll:function(){this.clearDimensions();this.clearOffsetParent()},toggleListeners:function(a,b){var c=this,b=b||["drag","drop","scroll"];e.each(b,function(b,f){c.$document[a](o[f],c[f+"Proxy"])})},clearOffsetParent:function(){this.offsetParent=h},clearDimensions:function(){this.containerDimensions=h;for(var a=this.containers.length;a--;)this.containers[a].clearDimensions()}};n.prototype={dragInit:function(a){var b=this.rootGroup;
  !b.dragInitDone&&1===a.which&&this.options.drag&&!e(a.target).is(this.options.exclude)&&b.dragInit(a,this)},searchValidTarget:function(a,b){var c=t(this.getItemDimensions(),a,b),d=c.length,f=this.rootGroup,e=!f.options.isValidTarget||f.options.isValidTarget(f.item,this);if(!d&&e)return f.movePlaceholder(this,this.el,"append"),!0;for(;d--;)if(f=c[d][0],!c[d][1]&&this.hasChildGroup(f)){if(this.getContainerGroup(f).searchValidTarget(a,b))return!0}else if(e)return this.movePlaceholder(f,a),!0},movePlaceholder:function(a,
  b){var c=e(this.items[a]),d=this.itemDimensions[a],f="after",h=c.outerWidth(),i=c.outerHeight(),g=c.offset(),g={left:g.left,right:g.left+h,top:g.top,bottom:g.top+i};this.options.vertical?b.top<=(d[2]+d[3])/2?(f="before",g.bottom-=i/2):g.top+=i/2:b.left<=(d[0]+d[1])/2?(f="before",g.right-=h/2):g.left+=h/2;this.hasChildGroup(a)&&(g=w);this.rootGroup.movePlaceholder(this,c,f,g)},getItemDimensions:function(){this.itemDimensions||(this.items=this.$getChildren(this.el,"item").filter(":not(.placeholder, .dragged)").get(),
  s(this.items,this.itemDimensions=[],this.options.tolerance));return this.itemDimensions},getItemOffsetParent:function(){var a=this.el;return"relative"===a.css("position")||"absolute"===a.css("position")||"fixed"===a.css("position")?a:a.offsetParent()},hasChildGroup:function(a){return this.options.nested&&this.getContainerGroup(a)},getContainerGroup:function(a){var b=e.data(this.items[a],"subContainer");if(b===h){var c=this.$getChildren(this.items[a],"container"),b=!1;c[0]&&(b=e.extend({},this.options,
  {parentContainer:this,group:u++}),b=c.sortable(b).data("sortable").group);e.data(this.items[a],"subContainer",b)}return b},enabled:function(){return!this.disabled&&(!this.parentContainer||this.parentContainer.enabled())},$getChildren:function(a,b){var c=this.rootGroup.options,d=c[b+"Path"],c=c[b+"Selector"],a=e(a);d&&(a=a.find(d));return a.children(c)},_serialize:function(a,b){var c=this,d=this.$getChildren(a,b?"item":"container").not(this.options.exclude).map(function(){return c._serialize(e(this),
  !b)}).get();return this.rootGroup.options.serialize(a,d,b)},clearDimensions:function(){this.itemDimensions=h;if(this.items&&this.items[0])for(var a=this.items.length;a--;){var b=e.data(this.items[a],"subContainer");b&&b.clearDimensions()}}};var q={enable:function(){this.disabled=!1},disable:function(){this.disabled=!0},serialize:function(){return this._serialize(this.el,!0)}};e.extend(n.prototype,q);e.fn.sortable=function(a){var b=Array.prototype.slice.call(arguments,1);return this.map(function(){var c=
  e(this),d=c.data("sortable");if(d&&q[a])return q[a].apply(d,b)||this;!d&&(a===h||"object"===typeof a)&&c.data("sortable",new n(c,a));return this})}}(jQuery,window);
  


$(document).ready(function()
  {
      var string;
      var array;
      var cookie;



      var adjustment; 
      var group = $("div.drag").sortable({
          group: 'drag',
          itemSelector: 'img',
          containerSelector: 'div',
          vertical: false,
          placeholder: '<div class="placeholder" />',
          pullPlaceholder: false,
  
          // set item relative to cursor position
          onDragStart: function ($item, container, _super) {
              var offset = $item.offset(),
              pointer = container.rootGroup.pointer
  
              adjustment = {
                left: pointer.left - offset.left,
                top: pointer.top - offset.top
              }
  
              _super($item, container)
          },
          onDrop: function (item, container, _super) {
              //console.log(group.sortable("serialize").get());
              $('#output').text(group.sortable("serialize").get().join("\n"))
              _super(item, container)
              string = document.getElementById("output").innerHTML;
              array = JSON.parse("[" + string + "]");
              
              cookie = document.cookie = "order=" + JSON.stringify(array) + "; SameSite=Lax";
              cookie = cookie.split(";")[0];
              cookie = cookie.split("=")[1];
              console.log(cookie);
              
          },
          onDrag: function ($item, position) {
          $item.css({
              width: 180,
              height: 180,
              left: position.left - adjustment.left,
              top: position.top - adjustment.top
          })
          },
          serialize: function (parent, children, isContainer) {
              return isContainer ? children.join() : parent.attr('rel')
          }
          
      })
      if(document.cookie) {
        var i;
        var cookie = document.cookie.split(";")[0];
        var array = cookie.split("=")[1];
        lol = JSON.parse("[" + array + "]");
        var arr = [1, 2, 3, 4, 5, 6, 7, 8];
        for(i = 1; i <= lol[0].length; i++) {
          var tmp = document.createElement("img");

          var obj1 = document.getElementById(arr[i-1]);
          var obj2 = document.getElementById(lol[0][i-1]);


          obj1.parentNode.insertBefore(tmp, obj1);
        
          // move obj1 to right before obj2
          obj2.parentNode.insertBefore(obj1, obj2);
        
          // move obj2 to right before where obj1 used to be
          tmp.parentNode.insertBefore(obj2, tmp);
        
          // remove temporary marker node
          tmp.parentNode.removeChild(tmp);
          for(let j = 1; j <= lol[0].length-1; j++) {
            if (arr[j] == lol[0][i-1]) {
              let tmp = arr[j];
              arr[j] = arr[i-1];
              arr[i-1] = tmp;
              break;
            }
          }
        }
        var strung = JSON.stringify(arr); 
        document.getElementById("output").innerHTML = strung.substring(1,strung.length-1);
        console.log(document.getElementById("output").innerHTML);
      }
  });


var isDragging = false;
$(".drag")
  .mousedown(function() {
      $(window).mousemove(function() {
          isDragging = true;
          $(window).unbind("mousemove");
      });
  })
  .mouseup(function() {
      var wasDragging = isDragging;
      isDragging = false;
      $(window).unbind("mousemove");
      if (!wasDragging) {
        openModal();
        $('#1').click(function(){
            currentSlide(1);
        });
        $('#2').click(function(){
            currentSlide(2);
        });
        $('#3').click(function(){
            currentSlide(3);
        });
        $('#4').click(function(){
            currentSlide(4);
        });
        $('#5').click(function(){
            currentSlide(5);
        });
        $('#6').click(function(){
            currentSlide(6);
        });
        $('#7').click(function(){
            currentSlide(7);
        });
        $('#8').click(function(){
            currentSlide(8);
        });
      }
});

var slideIndex = 1;
 // Open the Modal
 function openModal() {
    document.getElementById("myModal").style.display = "block";
  }
  
  // Close the Modal
  function closeModal() {
    document.getElementById("myModal").style.display = "none";
  }
  

  showSlides(slideIndex);
  
  // Next/previous controls
  function plusSlides() {
    moveRight();
  }
  function minusSlides() {
    moveLeft();
  }

  var interval;
  function play() {
    var check = document.getElementById("playpause");
    if(!check.checked){
        setTimeout(function(){}, 3000);
        interval = setInterval(function(){ moveRight(); }, 3000);
    }
    else {
        clearInterval(interval);
    }
  }

  // Thumbnail image controls
  function currentSlide(n) {
    slideIndex = n;
    showSlides(n);
  }
  
  function moveRight() {
    var i;
    var slides = document.getElementsByClassName("mySlides");
    var title = document.getElementById("caption");
    var desc = document.getElementById("desc");
    var string = document.getElementById("output").innerHTML;
    var array = JSON.parse("[" + string + "]");
    
    for (i = 0; i < slides.length; i++) {
        if(slides[i].style.display != "none")
            slides[i].style.display = "none";
      }
    var index = array.indexOf(slideIndex);

    if (index + 1 == slides.length) {index = -1;}

    var thumbnail = document.getElementById(array[index + 1]);

    while(thumbnail.style.display == "none") {
        index++;
        if (index + 1 == slides.length) {index = -1;}
        thumbnail = document.getElementById(array[index + 1]);
    }
    
    slides[array[index + 1]-1].style.display = "block";
    $.getJSON("js/photos.json", function(json){
        title.innerHTML = json.photos[array[index + 1]-1].title;
        desc.innerHTML = json.photos[array[index + 1]-1].description;
    });
    slideIndex = array[index + 1];

  }

  function moveLeft() {
    var i;
    var slides = document.getElementsByClassName("mySlides");
    var title = document.getElementById("caption");
    var desc = document.getElementById("desc");
    var string = document.getElementById("output").innerHTML;
    var array = JSON.parse("[" + string + "]");
    
    for (i = 0; i < slides.length; i++) {
        if(slides[i].style.display != "none")
            slides[i].style.display = "none";
      }

    var index = array.indexOf(slideIndex)-1;

    if ((index) < 0) {index = 7;}

    var thumbnail = document.getElementById(array[index]);

    while(thumbnail.style.display == "none") {
        index--;
        if ((index) < 0) {index = 7;}
        thumbnail = document.getElementById(array[index]);
    }
    
    slides[array[index]-1].style.display = "block";
    $.getJSON("js/photos.json", function(json){
        title.innerHTML = json.photos[array[index]-1].title;
        desc.innerHTML = json.photos[array[index]-1].description;
    });
    slideIndex = array[index];
  }

  function showSlides(n) {
    var i;
    var slides = document.getElementsByClassName("mySlides");
    var title = document.getElementById("caption");
    var desc = document.getElementById("desc");

    if (n > slides.length) {slideIndex = 1}
    if (n < 1) {slideIndex = slides.length}
    for (i = 0; i < slides.length; i++) {
      slides[i].style.display = "none";
    }

    slides[n-1].style.display = "block";
    $.getJSON("js/photos.json", function(json){
        title.innerHTML = json.photos[n-1].title;
        desc.innerHTML = json.photos[n-1].description;
    });
  }

function search(){
    var input, filter, title, desc, a, i, txtValue;
    input = document.getElementById('string');
    filter = input.value.toUpperCase();
    $.getJSON("js/photos.json", function(json){
        // Loop through all list items, and hide those who don't match the search query
        for (i = 0; i < json.photos.length; i++) {
            img = json.photos[i];
            if ((img.title.toUpperCase().indexOf(filter) > -1) || (img.description.toUpperCase().indexOf(filter) > -1)) {
                document.getElementById(img.value).style.display = "";
            } else {
                document.getElementById(img.value).style.display = "none";
            }
        }
    });
  }