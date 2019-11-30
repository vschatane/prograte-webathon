let current = 'div';
let componentName = 'Temp';

const codeBuilder = (componentName, html) => {
    return `<pre><code>import React from 'react'; <br /><br />class ${componentName} extends React.Component {<br />\trender () {<br />\t\treturn (<br />${html}<br />\t\t);<br />\t};<br />}</code></pre><br /><br />`;
};

window.onload = () => {
    const copyButton = document.querySelector("#copybut");
    console.log(copyButton);

    // document.querySelector("#mySelector").addEventListener("change", e => {
    //     displayFunc();
    // })

    copyButton.addEventListener('click', (event) => {
        if (document.querySelector("#userHTML").value.trim() === '') {
            // copyStringToClipboard('Please write some CSS first !');
            // return document.querySelector("#copyText").style.display = "";
            return alert('Please write some HTML first !');
        }

        let componentName = document.querySelector('#userComponentName').value;
        if (componentName.trim() === '') {
            componentName = "Temp";
        }

        let textToCopy = codeBuilder(componentName, document.querySelector('#userHTML').value);

        textToCopy = textToCopy.replace(/<br \/>/g, '\n');
        textToCopy = textToCopy.replace(/<pre>/g, '');
        textToCopy = textToCopy.replace(/<\/pre>/g, '');
        textToCopy = textToCopy.replace(/<code>/g, '');
        textToCopy = textToCopy.replace(/<\/code>/g, '');

        copyStringToClipboard(textToCopy);
        // document.querySelector("#copyText").style.display = "";
        alert('Copied to clipboard');
    });

    const styleInput = document.querySelector("#userHTML");
    styleInput.addEventListener("keyup", e => {
        updateComponent();
    })

    function copyStringToClipboard(str) {
        // Create new element
        var el = document.createElement('textarea');
        // Set value (string to be copied)
        el.value = str;
        // Set non-editable to avoid focus and move outside of view
        el.setAttribute('readonly', '');
        el.style = {
            position: 'absolute',
            left: '-9999px'
        };
        document.body.appendChild(el);
        // Select text inside element
        el.select();
        // Copy text to clipboard
        document.execCommand('copy');
        // Remove temporary element
        document.body.removeChild(el);
    }

    const updateComponent = () => {
        let html = document.querySelector('#userHTML').value
        let componentName = document.querySelector('#userComponentName').value;
        if (html.trim() === '') {
            document.querySelector('#outputCode').innerHTML = 'Please write some HTML first !';
        } else {

            html = html.replace(/\r/g, '<br/>');
            html = html.replace(/\n/g, '<br/>');
            if (componentName.trim() === '') {
                document.querySelector('#component').innerHTML = html;

                html = html.replace(/</g, '&lt;');
                html = html.replace(/>/g, '&gt;');
                html = html.replace(/class/g, 'className');
                document.querySelector('#outputCode').innerHTML = codeBuilder('Temp', html);

            } else {
                document.querySelector('#component').innerHTML = html;
                html = html.replace(/</g, '&lt;');
                html = html.replace(/>/g, '&gt;');
                html = html.replace(/class/g, 'className');
                document.querySelector('#outputCode').innerHTML = codeBuilder(componentName, html);

            }
        }
    }

    const displayFunc = () => {
        document.querySelector('#' + current).style.display = 'none';
        current = document.querySelector('#mySelector').value
        document.querySelector('#' + current).style = document.querySelector('#userHTML').value;
        updateComponent();
    }
}