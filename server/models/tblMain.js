module.exports = (sequelize, DataTypes) => {
  const tblmain = sequelize.define('tblmain', {
    // Model attributes are defined here
    order_id  : {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    applying_for_someone: {
      type: DataTypes.STRING(10)
      // allowNull defaults to true
    },

    applying_for_minor  : {
      type: DataTypes.STRING(10),
      allowNull: false
    },
    representative_is: {
      type: DataTypes.STRING
      // allowNull defaults to true
    },

    being_paid  : {
      type: DataTypes.STRING(10),
      allowNull: false
    },
    membership_id: {
      type: DataTypes.STRING(50)
      // allowNull defaults to true
    },

    province_or_territory  : {
      type: DataTypes.STRING,
      allowNull: false
    },
    surname: {
      type: DataTypes.STRING
      // allowNull defaults to true
    },

    first_name  : {
      type: DataTypes.STRING,
      allowNull: false
    },
    firm_or_organization: {
      type: DataTypes.STRING
      // allowNull defaults to true
    },

    mailing_address  : {
      type: DataTypes.STRING,
      allowNull: false
    },
    postal_code: {
      type: DataTypes.STRING(50)
      // allowNull defaults to true
    },

    telephone_number  : {
      type: DataTypes.STRING(20),
      allowNull: false
    },
    country_code: {
      type: DataTypes.STRING(10)
      // allowNull defaults to true
    },

    fax_number  : {
      type: DataTypes.STRING(20),
      allowNull: false
    },
    email_address: {
      type: DataTypes.STRING(100)
      // allowNull defaults to true
    },

    travel_document  : {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    country_on_passport: {
      type: DataTypes.STRING
      // allowNull defaults to true
    },
    will_use_national_israeli_passport  : {
      type: DataTypes.STRING(10),
      allowNull: false
    },
    will_use_electronic_passport: {
      type: DataTypes.STRING
      // allowNull defaults to true
    },

    will_use_passport_by_Ministry_Foreign_Affairs  : {
      type: DataTypes.STRING(11),
      allowNull: false
    },
    taiwan_personal_identification_number: {
      type: DataTypes.STRING(50)
      // allowNull defaults to true
    },

    confirm_taiwan_personal_identification_number  : {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    lawful_permanent_resident_of_us  : {
      type: DataTypes.STRING(11),
      allowNull: false
    },
    nationality_on_passport: {
      type: DataTypes.STRING
      // allowNull defaults to true
    },

    uscis_number  : {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    confirm_uscis_number: {
      type: DataTypes.STRING(50)
      // allowNull defaults to true
    },
    uscis_exp_year  : {
      type: DataTypes.STRING(10),
      allowNull: false
    },
    uscis_exp_month: {
      type: DataTypes.STRING(50)
      // allowNull defaults to true
    },

    uscis_exp_day  : {
      type: DataTypes.STRING(5),
      allowNull: false
    },
    citizen_country: {
      type: DataTypes.STRING(100)
      // allowNull defaults to true
    },

    passport_number  : {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    confirm_passport_number: {
      type: DataTypes.STRING(50)
      // allowNull defaults to true
    },

    passport_surname  : {
      type: DataTypes.STRING,
      allowNull: false
    },
    passport_first_name: {
      type: DataTypes.STRING
      // allowNull defaults to true
    },

    birth_year  : {
      type: DataTypes.STRING(10),
      allowNull: false
    },
    birth_month: {
      type: DataTypes.STRING(50)
      // allowNull defaults to true
    },

    birth_date  : {
      type: DataTypes.STRING(5),
      allowNull: false
    },
    gender: {
      type: DataTypes.STRING(20)
      // allowNull defaults to true
    },

    country_of_birth  : {
      type: DataTypes.STRING,
      allowNull: false
    },
    passport_issue_year: {
      type: DataTypes.STRING(50)
      // allowNull defaults to true
    },

    passport_issue_month  : {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    passport_issue_date: {
      type: DataTypes.STRING(20)
      // allowNull defaults to true
    },

    passport_exp_year  : {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    passport_exp_month: {
      type: DataTypes.STRING(50)
      // allowNull defaults to true
    },

    passport_exp_date  : {
      type: DataTypes.STRING(20),
      allowNull: false
    },
    city_of_birth: {
      type: DataTypes.STRING
      // allowNull defaults to true
    },
    marital_status  : {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    appliedd_for_visa_before: {
      type: DataTypes.STRING(10)
      // allowNull defaults to true
    },

    uci_number  : {
      type: DataTypes.STRING(20),
      allowNull: false
    },
    confirm_uci_number: {
      type: DataTypes.STRING(20)
      // allowNull defaults to true
    },

    occupation  : {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    specify_other: {
      type: DataTypes.STRING(100)
      // allowNull defaults to true
    },

    job_title  : {
      type: DataTypes.STRING(200),
      allowNull: false
    },
    employer_or_school_name: {
      type: DataTypes.STRING(200)
      // allowNull defaults to true
    },

    job_country  : {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    job_city: {
      type: DataTypes.STRING(100)
      // allowNull defaults to true
    },

    job_state  : {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    working_since: {
      type: DataTypes.STRING(10)
      // allowNull defaults to true
    },

    preferred_language  : {
      type: DataTypes.STRING(20),
      allowNull: false
    },
    email: {
      type: DataTypes.STRING(100)
      // allowNull defaults to true
    },

    confirm_email  : {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    apartment_number: {
      type: DataTypes.STRING(20)
      // allowNull defaults to true
    },

    house_name  : {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    street_name: {
      type: DataTypes.STRING(100)
      // allowNull defaults to true
    },

    street_name_2  : {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    country: {
      type: DataTypes.STRING(50)
      // allowNull defaults to true
    },

    city  : {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    district: {
      type: DataTypes.STRING(100)
      // allowNull defaults to true
    },

    res_state  : {
      type: DataTypes.STRING,
      allowNull: false
    },
    res_zip_code: {
      type: DataTypes.STRING
      // allowNull defaults to true
    },

    do_you_know_when_travel_to_canada  : {
      type: DataTypes.STRING,
      allowNull: false
    },
    travel_to_canada_year: {
      type: DataTypes.STRING
      // allowNull defaults to true
    },

    travel_to_canada_month  : {
      type: DataTypes.STRING,
      allowNull: false
    },
    travel_to_canada_day: {
      type: DataTypes.STRING
      // allowNull defaults to true
    },
    travel_to_canada_hour  : {
      type: DataTypes.STRING,
      allowNull: false
    },
    travel_to_canada_minute: {
      type: DataTypes.STRING
      // allowNull defaults to true
    },

    travel_to_canada_time_zone  : {
      type: DataTypes.STRING,
      allowNull: false
    },
    have_you_ever_been_refused_a_visa_or_permit: {
      type: DataTypes.STRING
      // allowNull defaults to true
    },

    country_that_refused_you_a_visa_or_permit  : {
      type: DataTypes.TEXT,
      allowNull: false
    },
    have_you_ever_committed_been_arrested: {
      type: DataTypes.STRING
      // allowNull defaults to true
    },

    please_indicate_where_committed_been_arrested  : {
      type: DataTypes.TEXT,
      allowNull: false
    },
    past_two_years_diagnosed_with_tuberculosis: {
      type: DataTypes.STRING
      // allowNull defaults to true
    },

    is_your_contact_with_tuberculosis  : {
      type: DataTypes.STRING,
      allowNull: false
    },
    have_you_ever_been_diagnosed_with_tuberculosis: {
      type: DataTypes.STRING
      // allowNull defaults to true
    },

    have_one_of_these_conditions  : {
      type: DataTypes.STRING,
      allowNull: false
    },
    additional_details: {
      type: DataTypes.TEXT
      // allowNull defaults to true
    },

    accept_terms_condition  : {
      type: DataTypes.STRING,
      allowNull: false
    },
    signature: {
      type: DataTypes.STRING
      // allowNull defaults to true
    },

    payment_status  : {
      type: DataTypes.STRING,
      allowNull: false
    },
    process_status: {
      type: DataTypes.STRING
      // allowNull defaults to true
    },

    amount  : {
      type: DataTypes.STRING,
      allowNull: false
    },
    myuser_token: {
      type: DataTypes.STRING
      // allowNull defaults to true
    },

    myuser_charge_id  : {
      type: DataTypes.STRING,
      allowNull: false
    },
    currency: {
      type: DataTypes.STRING
      // allowNull defaults to true
    },

    transaction_id  : {
      type: DataTypes.STRING,
      allowNull: false
    },
    refrence_no: {
      type: DataTypes.STRING
      // allowNull defaults to true
    },

    gov_order_id  : {
      type: DataTypes.STRING,
      allowNull: false
    },
    assign_to: {
      type: DataTypes.STRING
      // allowNull defaults to true
    },
    doc_uploaded  : {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    reference_no: {
      type: DataTypes.STRING
      // allowNull defaults to true
    },

    assign_date  : {
      type: DataTypes.DATE,
      allowNull: false
    },
    process_month: {
      type: DataTypes.STRING
      // allowNull defaults to true
    },
    processing_date  : {
      type: DataTypes.DATE,
      allowNull: false
    },
    Document_Number: {
      type: DataTypes.STRING
      // allowNull defaults to true
    },

    processing_type  : {
      type: DataTypes.TEXT,
      allowNull: false
    },
    cron_run_24hrs: {
      type: DataTypes.INTEGER
      // allowNull defaults to true
    },

    future_order_status  : {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    customer_sign: {
      type: DataTypes.TEXT
      // allowNull defaults to true
    },

    create_ts  : {
      type: DataTypes.TEXT,
      allowNull: false
    },
    refund_date: {
      type: DataTypes.DATE
      // allowNull defaults to true
    },

    customer_device_detail  : {
      type: DataTypes.TEXT,
      allowNull: false
    },
    customer_browser: {
      type: DataTypes.TEXT
      // allowNull defaults to true
    },
    customer_apply_country  : {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    customer_date: {
      type: DataTypes.DATE
      // allowNull defaults to true
    },

    customer_timezone  : {
      type: DataTypes.TEXT,
      allowNull: false
    },
    ip_address: {
      type: DataTypes.TEXT
      // allowNull defaults to true
    },

    date  : {
      type: DataTypes.TEXT,
      allowNull: false
    },
    s_and_c: {
      type: DataTypes.INTEGER
      // allowNull defaults to true
    },
    transaction_number  : {
      type: DataTypes.TEXT,
      allowNull: false
    },
    merchant_name: {
      type: DataTypes.TEXT
      // allowNull defaults to true
    },
  },
  {
    freezeTableName: true,
    tableName: 'tbl_main',
    updatedAt: false,
    createdAt: false,
  }
  );

  return tblmain;
}

