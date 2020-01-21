let links = document.querySelectorAll('.top-nav__item');

for(let i = 0; i < links.length; i++) {

  function testMessage() {
    if (i % 2 == 0) {
      document.querySelector('p').innerHTML = "Test change for the output scripts file."
    } else {
      document.querySelector('p').nextSibling.nextSibling.innerHTML = "Text change for the second paragraph tag."
    }
  }

  links[i].addEventListener('click', (testMessage));
}