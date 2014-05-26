angular.module('starter.directives', [])

        .directive('adjustimg', function() {
            return function(scope, element, attrs) {
                element.on('load', function() {
                    //alert("here");
                    var height = element[0].clientHeight;
                    var width = element[0].clientWidth;
                    //alert("height :"+height+"  width : "+width);
                    if (height / width > 1) {
                        //alert(width);
                        var top = (height - width) / 2;
                        var bottom = top + width;
                        element.css("clip", "rect(" + top + "px," + width + "px," + bottom + "px,0px)");
                        element.css("overflow", "hidden");
                        element.css("position", "absolute");
                        element.css("top", "-" + (top-5) + "px");
                        element.parent().css("height",width+"px");
                    } else if (height / width < 1) {
                        var left = (width - height) / 2;
                        var rigth = right + width;
                        element.css("clip", "rect(0px," + rigth + "px,"+height+"px," + left + "px)");
                        element.css("overflow", "hidden");
                        element.css("position", "absolute");
                        element.css("left", "-" + left + "px");
                        element.parent().css("width",heigth+"px");
                    }else{
                        //alert("image is already squared or problem with height and width");
                    }
                });


            };
        });