// require esphinx/support/object
// require esphinx_ui

var
    esPhinx;

(function ($module) {
    "use strict";

    var
        $ = esPhinx,

        hide = function (colletion, options) {
            // faltam testes para suporte a estilização. Talvez tenha de mapear as propriedades do css para ver se há transition, o tipo, caso tenha pegar os ms para usar no setTimeout
            colletion.hide();

            if (options) {
                resolveArgs(colletion, options);
            }
        },

        resolveArgs = function (colletion, options) {
            if (options.addClass) {
                colletion.addClass(options.addClass);
            }

            if (options.removeClass) {
                colletion.addClass(options.removeClass);
            }
        };

    $module.extend({

        handlers: {

            tooltip: {

                hideAll: function (e, tooltipClass, options) {
                    var
                        target = $(e.target),

                        closeAll = function (colletion, options) {
                            hide(colletion, options);
                        };

                    if (target.childElements(tooltipClass).count() === 0 &&
                        !target.is(tooltipClass)) {
                        closeAll(target.find(tooltipClass), options);
                    }
                },

                new: function (tooltip, options) {
                    var
                        ConstructorReference = $module.handlers.tooltip.new,

                        show = function (colletion, options) {
                            colletion.show();

                            if (options) {
                                resolveArgs(colletion, options);
                            }
                        };


                    if (!(this instanceof ConstructorReference)) {
                        return new ConstructorReference(tooltip, options);
                    }


                    // when click on son, the parent too will answer, because son it is contained in parent
                    this.toggle = function (e) {
                        var
                            target = $(e.target);

                        // debugger
                        if (!target.is(tooltip)) {
                            tooltip.css("position", "absolute");

                            if (tooltip.visible()) {
                                hide(tooltip, options);
                            }
                            else {
                                show(tooltip, options);
                            }

                            // toggle(tooltip, options);
                        }
                    };
                }

            }

        }

    });

})(esPhinx.ui);