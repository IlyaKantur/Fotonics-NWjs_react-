'use strict';

let SwitchTab = {
    tab_list: {},
    tab: {},
    selectedTab: 0,
    switchTab(id) {
        let tabs = window.parent.document.querySelectorAll('.tab_wp');
        let frames = window.parent.document.querySelectorAll('.frame');
        for (let i = 0; i < tabs.length; i++) {
            if (frames[i].id == id) {
                this.selectedTab = i;
                frames[i].style.display = 'block';
                tabs[i].style.background = 'gray';
                tabs[i].children[1].style.opacity = 1;
            } else {
                frames[i].style.display = 'none';
                tabs[i].style.background = 'white';
                tabs[i].children[1].style.opacity = 0;
            }
        }
    }
}

export default SwitchTab;