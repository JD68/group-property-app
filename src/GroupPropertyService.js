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

const propertyDisplayNames = {
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
    'year': 'Year',
    'address_1': 'Address 1',
    'address_2': 'Address 2',
    'address_3': 'Address 3',
    'city': 'City',
    'country': 'Country',
    'house_value_lq': 'House Value LQ',
    'house_value_median': 'House Value Median',
    'house_value_uq': 'House Value UQ',
    'income_median': 'Income Median',
    'lat': 'Latitude',
    'lng': 'Longitude',
    'primary': 'Primary',
    'state': 'State',
    'type': 'Type',
    'zip_code': 'Zip Code',
    'service_id': 'Service Id',
    'service_type': 'Service Type',
    'url': 'URL',
    'degree_key': 'Degree Key',
    'majors': 'Majors',
    'school_name': 'School Name',
    'do_not_contact': 'Do Not Contact',
    'email': 'Email',
    'company': 'Company',
    'function': 'Function',
    'industry': 'Industry',
    'title': 'Title',
    'comment_count': 'Comment Count',
    'like_count': 'Like Count',
    'total_engagement_count': 'Total Engagement Count',
    'uid': 'UID',
    'assignee': 'Assignee',
    'capacity_score': 'Capacity Score', 
    'donor_score': 'Donor Score',
    'engagement_score': 'Engagement Score',
    'et_donor_index': 'ET Donor Index',
    'largest_gift_amount': 'Largest Gift Amount',
    'largest_gift_date': 'Largest Gift Date',
    'largest_gift_label': 'Largest Gift Label',
    'last_gift_amount': 'Last Gift Amount',
    'last_gift_date': 'Last Gift Date',
    'last_gift_label': 'Last Gift Label',
    'lifetime_amount': 'Lifetime Amount',
    'lybunt': 'Lybunt',
    'professional_score': 'Professional Score',
    'sybunt': 'Sybunt',
    'amount': 'Amount',
    'fiscal_year': 'Fiscal Year',
    'phone': 'Phone'
};

const groupPropertyCache = {
    'General Info': []
};

async function loadJson() {
    try {
        return (await fetch('/schema.json')).json();
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
            name: schemaEntry.name,
            displayName: propertyDisplayNames[schemaEntry.name]
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

export default {
    getGroups: getGroups,
    getGroupProperties: getGroupProperties
}