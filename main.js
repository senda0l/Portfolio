const
    switcher = document.querySelector('.slider'),
    body = document.body,
    img = document.querySelectorAll('.dark1'),
    gmail=document.querySelector('.mail'),
    imgs=document.querySelectorAll('.light1');

switcher.addEventListener('click',()=>{
    body.classList.toggle('dark');

    gmail.classList.toggle('active');
    
    img.forEach(darkimg => {
        darkimg.classList.toggle('active')
    });
    
    imgs.forEach(lightimg => {
        lightimg.classList.toggle('light')
    });
    
    const isDark = body.contains('dark')+img.contains('active');
    
})