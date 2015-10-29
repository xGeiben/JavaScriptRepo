﻿// Para obtener una introducción a la plantilla Navegación, consulte la siguiente documentación:
// http://go.microsoft.com/fwlink/?LinkID=392287
(function () {
    "use strict";

    var activation = Windows.ApplicationModel.Activation;
    var app = WinJS.Application;
    var nav = WinJS.Navigation;
    var sched = WinJS.Utilities.Scheduler;
    var ui = WinJS.UI;

    app.addEventListener("activated", function (args) {
        if (args.detail.kind === activation.ActivationKind.launch) {
            if (args.detail.previousExecutionState !== activation.ApplicationExecutionState.terminated) {
                // TODO: Esta aplicación se ha iniciado recientemente. Inicializar
                // la aplicación aquí.
            } else {
                // TODO: Se ha suspendido y finalizado esta aplicación.
                // Para crear una experiencia de usuario fluida, restaure aquí el estado de la aplicación de forma que parezca que la aplicación no ha dejado de ejecutarse nunca.
            }

            nav.history = app.sessionState.history || {};
            nav.history.current.initialPlaceholder = true;

            // Optimizar la carga de la aplicación y, mientras se muestra la pantalla de presentación, ejecutar el trabajo programado con prioridad alta.
            ui.disableAnimations();
            var p = ui.processAll().then(function () {
                return nav.navigate(nav.location || Application.navigator.home, nav.state);
            }).then(function () {
                return sched.requestDrain(sched.Priority.aboveNormal + 1);
            }).then(function () {
                ui.enableAnimations();
            });

            args.setPromise(p);
        }
    });

    app.oncheckpoint = function (args) {
        // TODO: Esta aplicación está a punto de suspenderse. Guardar cualquier estado
        // que deba conservarse en las suspensiones. Si necesita 
        // completar una operación asincrónica antes de que se suspenda 
        // la aplicación, llame a args.setPromise().
        app.sessionState.history = nav.history;
    };

    app.start();
})();
