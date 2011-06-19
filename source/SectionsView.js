enyo.kind({
	name: "plex.SectionsView",
	kind: "VFlexBox",
	className: "enyo-bg",
	published: {
		headerContent: "",
		parentMediaContainer: undefined,
	},
	events: {
		onGo: ""
	},
	components: [
		{name: "header", kind: "Header",style: '-webkit-box-align: center !important',pack: 'center', className: "enyo-header-dark", components: [
			{kind: "Image", src: "images/PlexTextLogo.png", style: "padding: none;"}
		]},
		{kind: enyo.Scroller, flex: 1, components: [
			{name: "serverList",kind: "VirtualList",flex: 1, height: "100%", onSetupRow: "setupServerItems", components: [
				 {name: "cells", kind: "VFlexBox"}
			]}
		]},
				
		{kind: "Selection"},		
		{kind: "Toolbar", components: [
		  {kind: "Button", caption: "Show App Menu", onclick: "openAppMenu", showing: true},
		]}
	],
	create: function() {
		this.inherited(arguments);
		this.listedServers = [];
		this.sections = [];
		this.headerContentChanged();
		this.parentMediaContainerChanged();
		this.objCurrNavItem = "";
		this.selectedRow = -1;
		this.$.cells.destroyComponents();
	},
	headerContentChanged: function() {
		//this.$.header.setContent(this.headerContent);
	},
	parentMediaContainerChanged: function() {
		//this.render();
		this.$.cells.destroyComponents();
		this.$.serverList.refresh();
	},
	setupServerItems: function(inSender, inIndex) {
		if (this.parentMediaContainer !== undefined && this.parentMediaContainer.length >= inIndex) {
				var mediaObj = this.parentMediaContainer[inIndex];
				if (mediaObj !== undefined) {
					this.log("creating server " + mediaObj.server.name);
					this.$.cells.createComponent({kind: "plex.ServerSection", mediaServer: mediaObj, caption: mediaObj.server.name});
					return true;
				}
		}
		return false;
	},
	openAppMenu: function() {
      this.owner.$.appMenu.open();
  },
 });
