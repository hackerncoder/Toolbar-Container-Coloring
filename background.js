
const shadeBlendConvert = function (p, from, to) {
  if(typeof(p)!="number"||p<-1||p>1||typeof(from)!="string"||(from[0]!='r'&&from[0]!='#')||(to&&typeof(to)!="string"))return null; //ErrorCheck
  if(!this.sbcRip)this.sbcRip=(d)=>{
      let l=d.length,RGB={};
      if(l>9){
          d=d.split(",");
          if(d.length<3||d.length>4)return null;//ErrorCheck
          RGB[0]=i(d[0].split("(")[1]),RGB[1]=i(d[1]),RGB[2]=i(d[2]),RGB[3]=d[3]?parseFloat(d[3]):-1;
      }else{
          if(l==8||l==6||l<4)return null; //ErrorCheck
          if(l<6)d="#"+d[1]+d[1]+d[2]+d[2]+d[3]+d[3]+(l>4?d[4]+""+d[4]:""); //3 or 4 digit
          d=i(d.slice(1),16),RGB[0]=d>>16&255,RGB[1]=d>>8&255,RGB[2]=d&255,RGB[3]=-1;
          if(l==9||l==5)RGB[3]=r((RGB[2]/255)*10000)/10000,RGB[2]=RGB[1],RGB[1]=RGB[0],RGB[0]=d>>24&255;
      }
  return RGB;}
  var i=parseInt,r=Math.round,h=from.length>9,h=typeof(to)=="string"?to.length>9?true:to=="c"?!h:false:h,b=p<0,p=b?p*-1:p,to=to&&to!="c"?to:b?"#000000":"#FFFFFF",f=this.sbcRip(from),t=this.sbcRip(to);
  if(!f||!t)return null; //ErrorCheck
  if(h)return "rgb"+(f[3]>-1||t[3]>-1?"a(":"(")+r((t[0]-f[0])*p+f[0])+","+r((t[1]-f[1])*p+f[1])+","+r((t[2]-f[2])*p+f[2])+(f[3]<0&&t[3]<0?")":","+(f[3]>-1&&t[3]>-1?r(((t[3]-f[3])*p+f[3])*10000)/10000:t[3]<0?f[3]:t[3])+")");
  else return "#"+(0x100000000+r((t[0]-f[0])*p+f[0])*0x1000000+r((t[1]-f[1])*p+f[1])*0x10000+r((t[2]-f[2])*p+f[2])*0x100+(f[3]>-1&&t[3]>-1?r(((t[3]-f[3])*p+f[3])*255):t[3]>-1?r(t[3]*255):f[3]>-1?r(f[3]*255):255)).toString(16).slice(1,f[3]>-1||t[3]>-1?undefined:-2);
}

var colorUrlBox = 1;

function onGot(item) {
 if (item.urlBox) {
   colorUrlBox = item.urlBox;
 }
}

class containersTheme {
  constructor() {
    browser.tabs.onActivated.addListener((activeInfo) => {
      this.updateTabContainerTheme(activeInfo.tabId, activeInfo.windowId);
    });
  }

  isUnpaintedTheme(currentCookieStore) {
    return (currentCookieStore == "firefox-default" ||
            currentCookieStore == "firefox-private");
  }

  async updateTabContainerTheme(tabId, windowId) {

    let getting = browser.storage.sync.get("urlBox");
    getting.then(onGot, null);

    var toolbarColor = "#323234";
    var tabLineColor = "#0A84FF";
    var urlfieldColor = "rgb(71, 71, 73)"
    var tab = await browser.tabs.get(tabId);

    if (!this.isUnpaintedTheme(tab.cookieStoreId)) {
      var container = await browser.contextualIdentities.get(tab.cookieStoreId)
      toolbarColor = shadeBlendConvert(-0.6, container.colorCode)
      tabLineColor = toolbarColor;
      if(colorUrlBox == 0) {
        urlfieldColor = toolbarColor
      }
    }

    browser.theme.update(windowId, {
      images: {
        headerURL: "",
      },
      colors: {
        frame: "#0C0C0D",
        tab_background_text: "#eee",
        toolbar: toolbarColor,
        tab_line: tabLineColor,
        textcolor: "rgb(249, 249, 250)",
        icons: "rgb(249, 249, 250, 0.7)",
        accentcolor: "hsl(240, 5%, 5%)",
        popup: "#4a4a4f",
        popup_text: "rgb(249, 249, 250)",
        popup_border: "#27272b",
        toolbar_bottom_separator: "hsl(240, 5%, 5%)",
        toolbar_field_border: "rgba(249, 249, 250, 0.2)",
        toolbar_field_separator: "#5F6670",
        ntp_background: "#2A2A2E",
        ntp_text: "rgb(249, 249, 250)",
        sidebar: "#38383D",
        sidebar_text: "rgb(249, 249, 250)",
        //toolbar_field: "rgb(71, 71, 73)",
        toolbar_field: urlfieldColor,
        toolbar_field_text: "rgb(249, 249, 250)"

        // accentcolor: "#333",​
        // textcolor: "#c2c2c2",
        // toolbar: toolbarColor,
        // toolbar_field: "#333",
        // toolbar_field_text: null,

        // bookmark_text: null,
        // button_background_active: "#f00",
        // button_background_hover: null,
        // frame: null,
        // frame_inactive: null,
        // icons: null,
        // icons_attention: null,
        // ntp_background: null,
        // ntp_text: null,
        // popup: null,
        // popup_border: null,
        // popup_highlight: null,
        // popup_highlight_text: null,
        // popup_text: null,
        // sidebar: null,
        // sidebar_highlight: null,
        // sidebar_highlight_text: null,
        // sidebar_text: null,
        // tab_background_separator: "#f00",
        // tab_background_text: null,
        // tab_loading: null,
        // tab_selected: null,
        // tab_text: null,
        // toolbar_bottom_separator: null,
        // toolbar_field_border: null,
        // toolbar_field_border_focus: null,
        // toolbar_field_focus: null,
        // toolbar_field_separator: null,
        // toolbar_field_text_focus: null,
        // toolbar_text: "#dcdcdc",
        // toolbar_top_separator: null,
        // toolbar_vertical_separator: null
      }
    });

  }
}

new containersTheme();
