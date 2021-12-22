let barIcon = null;

function toggleMenu(element) {
    let x = document.getElementById("mobile-side-bar");
    barIcon = element;
    if (x.style.display === "none") {
        x.style.display = "block";
        barIcon.classList.add("menu-close");
    } else {
        x.style.display = "none";
        barIcon.classList.remove("menu-close");
    }
}

window.addEventListener('resize', function () {
    let x = document.getElementById("mobile-side-bar");
    x.style.display = "none";
    if (barIcon) {
        barIcon.classList.remove("menu-close");
    }
}, true);


// Special handling for in-app browsers that don't always support new windows
(function () {
    function browserSupportsNewWindows(userAgent) {
        var rules = [
            'FBIOS',
            'Twitter for iPhone',
            'WebView',
            '(iPhone|iPod|iPad)(?!.*Safari\/)',
            'Android.*(wv|\.0\.0\.0)'
        ];
        var pattern = new RegExp('(' + rules.join('|') + ')', 'ig');
        return !pattern.test(userAgent);
    }

    if (!browserSupportsNewWindows(navigator.userAgent || navigator.vendor || window.opera)) {
        document.getElementById('af-form-1983711443').parentElement.removeAttribute('target');
    }

})();



function loadJson(file, callback) {
    const rawFile = new XMLHttpRequest();
    rawFile.overrideMimeType("application/json");
    rawFile.open("GET", file, true);
    rawFile.onreadystatechange = function () {
        if (rawFile.readyState === 4 && rawFile.status == "200") {
            callback(JSON.parse(rawFile.responseText));
        }
    }
    rawFile.send(null);
}

//////////////////////////////////////////////////////////////////////////////
//Partners
//////////////////////////////////////////////////////////////////////////////
function addCards(sectionName, data, additionalClass) {
    const companies = document.getElementById(sectionName);
    const section = data[sectionName];
    const cards = section.cards;

    cards.forEach((card, index) => {
        const partner = document.createElement('div');
        const {innerHTML, className} = partnersHTML(card, additionalClass, section, index);
        partner.innerHTML = innerHTML;
        partner.className = className;
        companies.appendChild(partner);
    });
}

function partnersHTML(card, additionalClass, section, index) {
    const template = section.template;
    const description = card.description;
    const imgPath = section.path + card.img;
    const name = card.name;
    const position = card.position;
    if (template === 'partners') {
        return {
            innerHTML: `
                <div class="blue-border-box-clip top-clip"></div>
                <div class="blue-border-box-clip bottom-clip"></div>
                <div class="companies-box-content ${additionalClass}">
                    ${getPartnersTemplateContent(imgPath, description)}
                </div>`,
            className: 'blue-border-box-big companies-box'
        }
    }

    if (template === 'members') {
        return  {
            innerHTML: `<div class="team-member-img">
                <img src="${imgPath}" alt="">
            </div>
            <div class="team-member-name">${name}</div>
            <div class="team-member-position">${position}</div>
            <div class="team-member-description">${description}</div>`,
            className: 'team-member'
        }
    }

    if (template === 'roadmap') {
        return  {
            innerHTML: `<div class="circle-and-line">
                            <span class="circle"></span>
                            <span class="circle-small"></span>
                            <span class="line"></span>
                        </div>

                        <div class="roadmap-description-holder">
                            <div>
                                <div class="rectangle-holder">
                                    <span class="rectangle rectangle-top"></span>
                                </div>
                                <ul>
                                    ${getRoadMapList(card.items)}
                                </ul>
                            </div>
                            <div class="rectangle-holder rectangle-holder-bottom">
                                <span class="rectangle rectangle-bottom"></span>
                            </div>
                        </div>`,
            className: 'roadmap-item'
        }
    }

    if (template === 'tokenomics') {
        const oddClass = index % 2 ? ' table-item-odd' : '';
        return  {
            innerHTML: `<span class="${card.className}__category">${card.category}</span>
                        <span class="${card.className}__allocation">${card.allocation}</span>
                        <span class="${card.className}__raise">${card.raise}</span>
                        <span class="${card.className}__locked">${card.locked}</span>
                        <span class="${card.className}__vesting">${card.vesting}</span>
                        <span class="${card.className}__notes">${card.notes}</span>
            `,
            className: card.className + oddClass
        }
    }
}

function getRoadMapList(items) {
    let list = '';
    items.forEach((item) => {
        list += `<li>${item}</li>`
    })
    return list
}

function addIndexSections(data) {
    const sections = [
        {name: 'partners', className: 'partners-companies-box-content'},
        {name: 'strategicPartners', className: '' },
        {name: 'councilMembers', className: '' },
        {name: 'roadmap', className: '' },
        {name: 'strategicAdvisors', className: '' },
        {name: 'tokenomics', className: '' },
    ];
    sections.forEach((section) => {
        addCards(section.name, data, section.className);
    });
}

function addTokenSection(data) {
    const sections = [{name: 'tokenomics', className: '' },
    ];
    sections.forEach((section) => {
        addCards(section.name, data, section.className);
    });
}

function getPartnersTemplateContent(imgPath, description) {
    let temp = `<div><img src="${imgPath}" alt=""></div>`;
    if (description) {
        temp += `<div>${description}</div>`;
    }
    return temp;
}
//////////////////////////////////////////////////////////////////////////////
//Team
//////////////////////////////////////////////////////////////////////////////


