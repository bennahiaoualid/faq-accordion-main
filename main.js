function getEventParent(ele){
    // collapsed the active element
    let currentActive = document.querySelector(".container li > p[data-collapsed=false]")
    if (currentActive !== null){
        let icon = currentActive.parentElement.getElementsByClassName("icon")[0];
        collapseSection(currentActive)
        changeIcon(icon);
    }
    // expand the trigged element
    let context = ele.lastElementChild;
    icon = ele.getElementsByClassName("icon")[0];
    let isCollapsed = context.getAttribute('data-collapsed') === 'true';
    console.log( context.getAttribute('data-collapsed') === 'true')
    if(isCollapsed) {
        expandSection(context)
        changeIcon(icon,false);
        context.setAttribute('data-collapsed', 'false')
      } else {
        collapseSection(context);
        context.setAttribute('data-collapsed', 'true')
        changeIcon(icon);
      }
}

function changeIcon(eleImag,active = true){
    console.log(eleImag,active)
    if (active){
        eleImag.setAttribute("src","./assets/images/icon-plus.svg")
    }
    else{
        eleImag.setAttribute("src","./assets/images/icon-minus.svg")
    } 
}
let question_ele = document.querySelectorAll(".container li")
question_ele.forEach(element => {
    element.addEventListener("click",function(event){
        getEventParent(event.currentTarget)
    });
});


// This is the important part!

function collapseSection(element) {
    // get the height of the element's inner content, regardless of its actual size
    var sectionHeight = element.scrollHeight;
    
    // temporarily disable all css transitions
    var elementTransition = element.style.transition;
    element.style.transition = '';
    
    // on the next frame (as soon as the previous style change has taken effect),
    // explicitly set the element's height to its current pixel height, so we 
    // aren't transitioning out of 'auto'
    requestAnimationFrame(function() {
      element.style.height = sectionHeight + 'px';
      element.style.transition = elementTransition;
      
      // on the next frame (as soon as the previous style change has taken effect),
      // have the element transition to height: 0
      requestAnimationFrame(function() {
        element.style.height = 0 + 'px';
      });
    });
  }
  
  function expandSection(element) {
    // get the height of the element's inner content, regardless of its actual size
    var sectionHeight = element.scrollHeight;
    
    // have the element transition to the height of its inner content
    element.style.height = sectionHeight + 'px';
    // when the next css transition finishes (which should be the one we just triggered)
    element.addEventListener('transitionend', function(e) {
        // remove this event listener so it only gets triggered once
        element.removeEventListener('transitionend', arguments.callee);
    });
    
    // mark the section as "currently not collapsed"
    element.setAttribute('data-collapsed', 'false');
  }
  
  document.querySelector('#toggle-button').addEventListener('click', function(e) {
    var section = document.querySelector('.section.collapsible');
    var isCollapsed = section.getAttribute('data-collapsed') === 'true';
      
    if(isCollapsed) {
      expandSection(section)
      section.setAttribute('data-collapsed', 'false')
    } else {
      collapseSection(section)
    }
  });