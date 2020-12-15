function MenuBar(){
    function create(MENU) {
         let menu = new nw.Menu({
             type: 'menubar'
         });
 
         for (let i in MENU) {
             let m = MENU[i]
             let submenu = null;
             if (m.submenu) {
                 submenu = new nw.Menu();
                 for (let j = 0; j < m.submenu.length; j++) {
                     let s = m.submenu[j];
                     submenu.append(new nw.MenuItem({
                         label: s.label,
                         click: s.click
                     }))
                 }
             }
             menu.append(new nw.MenuItem({
                 label: m.label,
                 submenu: submenu
             }))
         };
         nw.Window.get().menu = menu;
     }
 
     return Object({
         create
     })
 }

 export default MenuBar;