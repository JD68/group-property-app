const groupPropertyCache = {
    'General Info': []
};

const groupDisplayNames = {
    'address': 'Address',
    'education': 'Education',
    'email': 'Email',
    'employment': 'Employment',
    'giving_annual_donation': 'Giving Annual Donation',
    'phone': 'Phone',
    'avatar': 'Avatar',
    'facebook': 'Facebook',
    'giving': 'Giving'
};

//do I need to define order too?
/*const generalInfoDisplayProperties = {
    'deceased': 'Deceased',
    'dt_deceased': 'Date Deceased',
    'ethnicity': 'Ethnicity',
    'gender': 'Gender',
    'name_first': 'First Name',
    'name_last': 'Last Name',
    'name_maiden': 'Previous Last Name',
    'name_middle': 'Middle Name',
    'name_nick': 'Nickname',
    'name_prefix': 'Prefix',
    'name_suffix': 'Suffix',
    'year': 'Year'
};*/



async function loadJson() {
    try {
        return (await fetch(process.env.PUBLIC_URL + '/schema.json')).json();
    } catch (e) {
        console.error('fetch schema.json exception:');
    }
}

function transformSchema(schema) {
    
   schema.forEach(schemaEntry => {
        if(isGeneralProperty(schemaEntry)) {
            groupPropertyCache['General Info'].push(createTransformedEntry(schemaEntry))
        } else if(hasContainingObject(schemaEntry)) {
            groupPropertyCache[groupDisplayNames[schemaEntry.containing_object.name]] = [];
            schemaEntry.containing_object.properties.forEach(property => {
                groupPropertyCache[groupDisplayNames[schemaEntry.containing_object.name]].push(createTransformedEntry(property));
            });
        } else if(hasPropertiesObject(schemaEntry)) {
            groupPropertyCache[groupDisplayNames[schemaEntry.name]] = [];
            schemaEntry.properties.forEach(property => {
                groupPropertyCache[groupDisplayNames[schemaEntry.name]].push(createTransformedEntry(property));
            });
        }
    });

    return schema;

    function isGeneralProperty(schemaEntry) {
        return !hasContainingObject(schemaEntry) && !hasPropertiesObject(schemaEntry); //Giving and a few others doesn't have containing object but does have properties object
    }
    function hasContainingObject(schemaEntry) {
        return schemaEntry.hasOwnProperty('containing_object');
    }
    function hasPropertiesObject(schemaEntry) {
        return schemaEntry.hasOwnProperty('properties');
    }
    function createTransformedEntry(schemaEntry) {
        return {
            dataType: schemaEntry.data_type,
            appKeys: schemaEntry.app_keys,
            name: schemaEntry.name
        }
    }
}

async function getGroups() {
    if(groupPropertyCache['General Info'].length === 0) {
        transformSchema(await loadJson());
    }
    return Object.getOwnPropertyNames(groupPropertyCache);
}

function getGroupProperties(group) {
    return groupPropertyCache[group];
}
function defaultGroup() {
    return 'General Info';
}

export default {
    getGroups: getGroups,
    getGroupProperties: getGroupProperties,
    defaultGroup: defaultGroup
}