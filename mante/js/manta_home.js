let UIModule, EventModule, LogicModule;

//for the uimodule
UIModule = (function(){
    let UINames, hid_nav, unhid_nav,nav_Hover,nav_Hoved,child,s__1;

    UINames = {
        HiddenNav: '#hidden_nav',
        NavHov : '#nav_hover',
        S_1 : '#s_1'
    }


    child = document.querySelector(UINames.NavHov)
    
   //-when the menu bar is click show the nav options


    hid_nav = function(){
        document.querySelector(UINames.HiddenNav).style.display = "block"
    }

    unhid_nav = function(){
        document.querySelector(UINames.HiddenNav).style.display = "none"
    }

    //-when hover a nav bar there should be options to click on.

    nav_Hover = function(){
        document.querySelector(UINames.NavHov).style.display = "block"
    }

    nav_Hoved = function(){
        document.querySelector(UINames.NavHov).style.display = "none"
    }
    
    //-when form search bar clicked there is a drop down of items
    s__1  = document.querySelector(UINames.S_1)
     /*create a DIV element that will contain the items (values):*/
     const autocompleteItemsElement = document.createElement("div");
     autocompleteItemsElement.setAttribute("class", "autocomplete-items");
     s__1.appendChild(autocompleteItemsElement);

     function reg(){
        /* Create a DIV element for each element: */
        const itemElement = document.createElement("div");
        /* Set formatted address as item value */
        itemElement.innerHTML = result.formatted;
        autocompleteItemsElement.appendChild(itemElement);
  }

  function closeDropDownList() {
    var autocompleteItemsElement = s__1.querySelector(".autocomplete-items");
    if (autocompleteItemsElement) {
      inputContainerElement.removeChild(autocompleteItemsElement);
    }
  }






    return {
        Hidden_menu : function(){
            hid_nav()
        },

        Unhidden_menu :function(){
            unhid_nav()
        },

        NavHovBar : function(){
            nav_Hover()
        },

        NavHoved : function(){
            nav_Hoved()
        },

        NavChild : child,

        regBar : reg(),

        close : closeDropDownList()
    }
  
}())



//for eventModule
EventModule = (function(UI_MOD){
    let EventNames, getEvent, menuBtn,SecMenuBtn, getHideEvent, nav_link,navMenu,navMenuBar,sec_Bar;
    

//- the menu bar when click shows the nav options
    EventNames = {
        navBtn : "#nav_btn",
        hideBtn : "#hide_btn",
        NavLink : '#nav_link',
        Search : '#search_bar'
    }

    
     getEvent = document.querySelector(EventNames.navBtn)
     getHideEvent = document.querySelector(EventNames.hideBtn)

   menuBtn = getEvent.addEventListener("click", function(e){
        if(e){
            UI_MOD.Hidden_menu()
        }else{
            console.log("this does not work")
        }
    })

    SecMenuBtn = getHideEvent.addEventListener('click', function(e){
        if(e){
            UI_MOD.Unhidden_menu()
        }
    })

    // event for nav bar when hovered

    let timeOutValue, setToHide, TimetoHide; 

    timeOutValue = 100;

    function setTimeToHid(){
           setToHide = window.setTimeout(UI_MOD.NavHoved(), timeOutValue)
    }

    function ResetTimer(){
        
        if(1){
            setToHide = 0;
            window.clearTimeout(0)
        }else{
            console.log("there is a problem here")
        }
    }


    nav_link = document.querySelector(EventNames.NavLink)

    navMenu = nav_link.addEventListener('mouseover', function(e){
        if(e){
            UI_MOD.NavHovBar()
        }else{
            console.log('problem')
        }
    })

    navMenuBar = nav_link.addEventListener('mouseout', function(e){
        if(e){
            setTimeToHid()
        }else{
            console.log("non")
        }
    })

    TimetoHide = UI_MOD.NavChild

    let mod = TimetoHide.addEventListener('mouseover', function(e){
        if(e){
            ResetTimer()
        }else{
            console.log('this is a problem')
        }
    })

    let nod = TimetoHide.addEventListener('mouseout', function(e){
        if(e){
            setTimeToHid()
        }
    })



    // 	-two events:takes input parameter from the form search
    sec_Bar = document.querySelector(EventNames.Search)

    function items(){
    itemElement.addEventListener("click", function(e) {
        inputElement.value = currentItems[index].formatted;
        callback(currentItems[index]);
        /* Close the list of autocompleted values: */
        closeDropDownList();
      });
}



    return {
        MenuBtn : menuBtn,

        navMen : navMenu,

        time : mod,
        navbar : navMenu,
        navmenu : navMenuBar,
        autoBar : sec_Bar,
        item : items()

    }

}(UIModule))


//for logicModule
LogicModule = (function(Event_Mod, Ui_Mod){
    let autoComplete;
    //gets the location when entered in the field
    autoComplete = Event_Mod.autoBar
    
    function AddressAutocomplete() {
        const MIN_ADDRESS_LENGTH = 3;
        const DEBOUNCE_DELAY = 300;
        let = currentItems;

  /* Process a user input: */
  autoComplete.addEventListener("input", function(e) {
    const currentValue = this.value;

    // Cancel previous timeout
    if (currentTimeout) {
      clearTimeout(currentTimeout);
    }

    // Cancel previous request promise
    if (currentPromiseReject) {
      currentPromiseReject({
        canceled: true
      });
    }

    // Skip empty or short address strings
    if (!currentValue || currentValue.length < MIN_ADDRESS_LENGTH) {
      return false;
    }

    /* Call the Address Autocomplete API with a delay */
    currentTimeout = setTimeout(() => {
    	currentTimeout = null;
            
      /* Create a new promise and send geocoding request */
      const promise = new Promise((resolve, reject) => {
        currentPromiseReject = reject;

        // Get an API Key on https://myprojects.geoapify.com
        const apiKey = "1d3cc62567be4d31b39d8bfc75fdc8b7";

        var url = `https://api.geoapify.com/v1/geocode/autocomplete?text=${encodeURIComponent(currentValue)}&format=json&limit=5&apiKey=${apiKey}`;

        fetch(url)
          .then(response => {
            currentPromiseReject = null;

            // check if the call was successful
            if (response.ok) {
              response.json().then(data => resolve(data));
            } else {
              response.json().then(data => reject(data));
            }
          });
      });

      promise.then((data) => {
        // here we get address suggestions
        currentItems = data.results;
        data.results.forEach((result, index) => {
            /* Create a DIV element for each element: */
            Ui_Mod.regBar
            Event_Mod.item
          });
        console.log(data);
      }, (err) => {
        if (!err.canceled) {
          console.log(err);
        }
      });
    }, DEBOUNCE_DELAY);
  });  
    }

    //-the two form needs to be filled before a search can happen



	//-when a form is incomplete show the color of the other form. 

    // return {
    //     Geocode : geoCode()
    // }

}(EventModule, UIModule))

//  function initialization (){
//     let geo = LogicModule.Geocode
//     console.log(geo)
// }

// initialization()

// LogicModule.Geocode





