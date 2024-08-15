import React from 'react';

function Demo() {
    return (
        <>
            <div className="services-section">
                <div className="container">
                    <div className="row g-3">
                        <div className="col">
                            <div className="service-card">
                                <div className="card-icon">
                                    <img src="../assets/images/Group-228.png" alt=""/>
                                </div>
                                <h3 className="card-subtitle">Muuttopalvelu urakka yksiöt</h3>
                                <h2 className="card-title">Näkyvä hinta on lopullinen</h2>
                                <hr/>
                                <a href="#" className="btn-link">Select</a>
                            </div>
                        </div>

                        <div className="col">
                            <div className="service-card">
                                <div className="card-icon">
                                    <img src="../assets/images/Group-229.png" alt=""/>
                                </div>
                                <h3 className="card-subtitle">Muuttopalvelu urakka kaksiot</h3>
                                <h2 className="card-title">Näkyvä hinta on lopullinen</h2>
                                <hr/>
                                <a href="#" className="btn-link">Select</a>
                            </div>
                        </div>

                        <div className="col">
                            <div className="service-card">
                                <div className="card-icon">
                                    <img src="./assets/images/Group-230.png" alt=""/>
                                </div>
                                <h3 className="card-subtitle">Muuttopalvelu urakka kolmiot</h3>
                                <h2 className="card-title">Näkyvä hinta on lopullinen</h2>
                                <hr/>
                                <a href="#" className="btn-link">Select</a>
                            </div>
                        </div>

                        <div className="col">
                            <div className="service-card">
                                <div className="card-icon">
                                    <img src="../assets/images/Group-231.png" alt=""/>
                                </div>
                                <h3 className="card-subtitle">Muuttopalvelu urakka neliöt</h3>
                                <h2 className="card-title">Näkyvä hinta on lopullinen</h2>
                                <hr/>
                                <a href="#" className="btn-link">Select</a>
                            </div>
                        </div>

                        <div className="col">
                            <div className="service-card">
                                <div className="card-icon">
                                    <img src="../assets/images/Group-232.png" alt=""/>
                                </div>
                                <h3 className="card-subtitle">Muuttopalvelu urakka 5h+</h3>
                                <h2 className="card-title">Näkyvä hinta on lopullinen</h2>
                                <hr/>
                                <a href="#" className="btn-link">Select</a>
                            </div>
                        </div>
                    </div>

                </div>
            </div>

            <div className="container">
                <div className="main">
                    <div className="search-companies">
                        <h1 className="title">Varaa Kätevästi. Kuljeta helposti.</h1>
                        <form className="row g-3">
                            <div className="col-12">
                                <label htmlFor="start_address" className="form-label">Start address</label>
                                <div className="input_wrap">
                                    <input className="form-control input_icon_pad" type="text" id="start_address"
                                           placeholder="Start address" />
                                    <i className="fa-solid fa-location-crosshairs input_icon"></i>
                                </div>
                            </div>
                            <div className="col-12">
                                <label htmlFor="end_address" className="form-label">
                                    End address
                                </label>
                                <div className="input_wrap">
                                    <input className="form-control is-invalid input_icon_pad" type="text" id="end_address"
                                           placeholder="End address" required />
                                    <i className="fa-solid fa-location-crosshairs input_icon"></i>
                                </div>
                            </div>
                            <div className="col-12">
                                <label htmlFor="select_product" className="form-label">Select Product</label>
                                <select className="form-select" id="select_product" aria-label="Select product">
                                    <option selected>Valitse palvelu | Choose service</option>
                                    <option value="1">Muuttopalvelu | Moving</option>
                                    <option value="2">Kuljetuspalvelu | Transportation</option>
                                    <option value="3">Paku ja Kuski | Man &amp; Van</option>
                                    <option value="4">Kotiinkuljetus | Home delivery</option>
                                </select>
                            </div>
                            <div className="col-sm-7">
                                <label htmlFor="data_time" className="form-label">Date and Time</label>
                                <input className="form-control is-invalid input_icon_pad" type="text"  placeholder="dd.mm.yyyy" required />
                            </div>
                            <div className="col-sm-5">
                                <label htmlFor="" className="form-label d-sm-block d-none">&nbsp;</label>
                                <select className="form-select is-invalid input_icon_pad" id="delivery_time" aria-label="Default select example" required>
                                    <option className="option">--valitse kellonaika--</option>
                                    <option className="option" value="09-10">09:00 - 10:00</option>
                                    <option className="option" value="10-11">10:00 - 11:00</option>
                                    <option className="option" value="11-12">11:00 - 12:00</option>
                                    <option className="option" value="12-13">12:00 - 13:00</option>
                                    <option className="option" value="13-14">13:00 - 14:00</option>
                                    <option className="option" value="14-15">14:00 - 15:00</option>
                                    <option className="option" value="15-16">15:00 - 16:00</option>
                                    <option className="option" value="17-18">17:00 - 18:00</option>
                                </select>
                            </div>

                            <div className="d-grid gap-2 mt-4">
                                <button type="button" className="btn btn-lg btn-primary">Search Companies</button>
                            </div>
                        </form>
                    </div>


                    <br/><br/><br/>

                    <div className="start-details">
                        <h1 className="title">Varaa Kätevästi. Kuljeta helposti.</h1>
                        <form className="row g-3">
                            <div className="col-12">
                                <label htmlFor="start_address" className="form-label">Address Number</label>
                                <div className="input_wrap">
                                    <input className="form-control" type="text" id="address_number"
                                           placeholder="Address Number" />
                                </div>
                            </div>

                            <div className="col-12">
                                <label htmlFor="door_code" className="form-label">Door Code</label>
                                <div className="input_wrap">
                                    <input className="form-control" type="text" id="door_code"
                                           placeholder="Door Code" />
                                </div>
                            </div>

                            <div className="col-12">
                                <label htmlFor="door_code" className="form-label">Asunnon pinta-ala (m2)*</label>
                                <div className="input_wrap">
                                    <input className="form-control" type="text" id="square_meters"
                                           placeholder="Asunnon pinta-ala (m2)" />
                                </div>
                            </div>

                            <div className="col-12">
                                <label htmlFor="select_floor" className="form-label">Select Floor</label>
                                <select className="form-select" id="select_floor" aria-label="Select Floor">
                                    <option value="">-</option>
                                    <option value="1">Maa-taso</option>
                                    <option value="2">Kerros 1</option>
                                    <option value="3">Kerros 2</option>
                                    <option value="4">Kerros 3</option>
                                    <option value="5">Kerros 4</option>
                                    <option value="6">Kerros 5</option>
                                    <option value="7">Kerros 6</option>
                                    <option value="8">Kerros 7</option>
                                    <option value="9">Kerros 8</option>
                                    <option value="10">Kerros 9</option>
                                    <option value="11">Kerros 10</option>
                                    <option value="12">Kerros 11</option>
                                    <option value="13">Kerros 12</option>
                                    <option value="14">Kerros 13</option>
                                    <option value="15">Kerros 14</option>
                                    <option value="16">Kerros 15</option>
                                    <option value="17">Kerros 16</option>
                                    <option value="18">Kerros 17</option>
                                    <option value="19">Kerros 18</option>
                                    <option value="20">Kerros 19</option>
                                    <option value="21">Kerros 20</option>
                                    <option value="22">Kerros 21</option>
                                    <option value="23">Kerros 22</option>
                                    <option value="24">Kerros 23</option>
                                    <option value="25">Kerros 24</option>
                                    <option value="26">Kerros 25</option>
                                    <option value="27">Kerros 26</option>
                                    <option value="28">Kerros 27</option>
                                    <option value="29">Kerros 28</option>
                                    <option value="30">Kerros 29</option>
                                    <option value="31">Kerros 30</option>
                                    <option value="32">Kerros 31</option>
                                    <option value="33">Kerros 32</option>
                                    <option value="34">Kerros 33</option>
                                    <option value="35">Kerros 34</option>
                                    <option value="36">Kerros 35</option>
                                    <option value="37">Kerros 36</option>
                                    <option value="38">Kerros 37</option>
                                    <option value="39">Kerros 38</option>
                                    <option value="40">Kerros 39</option>
                                </select>
                            </div>

                            <div className="col-12">
                                <label htmlFor="outdoor_distance" className="form-label">Outdoor Distance</label>
                                <select className="form-select" id="outdoor_distance" aria-label="Outdoor Distance">
                                    <option value="1">1 m</option>
                                    <option value="2">2 m</option>
                                    <option value="3">3 m</option>
                                    <option value="4">4 m</option>
                                    <option value="5">5 m</option>
                                    <option value="6">6 m</option>
                                    <option value="7">7 m</option>
                                    <option value="8">8 m</option>
                                    <option value="9">9 m</option>
                                    <option value="10">10 m</option>
                                    <option value="11">11 m</option>
                                    <option value="12">12 m</option>
                                    <option value="13">13 m</option>
                                    <option value="14">14 m</option>
                                    <option value="15">15 m</option>
                                    <option value="16">16 m</option>
                                    <option value="17">17 m</option>
                                    <option value="18">18 m</option>
                                    <option value="19">19 m</option>
                                    <option value="20">20 m</option>
                                    <option value="21">21 m</option>
                                    <option value="22">22 m</option>
                                    <option value="23">23 m</option>
                                    <option value="24">24 m</option>
                                    <option value="25">25 m</option>
                                    <option value="26">26 m</option>
                                    <option value="27">27 m</option>
                                    <option value="28">28 m</option>
                                    <option value="29">29 m</option>
                                    <option value="30">30 m</option>
                                    <option value="31">31 m</option>
                                    <option value="32">32 m</option>
                                    <option value="33">33 m</option>
                                    <option value="34">34 m</option>
                                    <option value="35">35 m</option>
                                    <option value="36">36 m</option>
                                    <option value="37">37 m</option>
                                    <option value="38">38 m</option>
                                    <option value="39">39 m</option>
                                    <option value="40">40 m</option>
                                </select>
                            </div>

                            <div className="col-12">
                                <label htmlFor="select_elevator" className="form-label">Select Elevator</label>
                                <select className="form-select" id="select_elevator" aria-label="Select Elevator">
                                    <option value="">-</option>
                                    <option value="1">Ei hissiä</option>
                                    <option value="2">Pieni hissi (alle 1m2)</option>
                                    <option value="3">Iso hisi (1m2 tai isompi)</option>
                                </select>
                            </div>

                            <div className="col-12">
                                <label htmlFor="storage" className="form-label">Storage</label>
                                <select className="form-select" id="storage" aria-label="Storage">
                                    <option value="">-</option>
                                    <option value="1">There is no warehouse</option>
                                    <option value="2">Basement closet / outdoor storage</option>
                                    <option value="3">Vintti / Ullakko</option>
                                </select>
                            </div>

                            <div className="col-12">
                                <label htmlFor="storage_area" className="form-label">Storage Area (m2)*</label>
                                <div className="input_wrap">
                                    <input className="form-control" type="text" id="storage_area"
                                           placeholder="Storage Area (m2)" />
                                </div>
                            </div>

                            <div className="col-12">
                                <label htmlFor="storage_floor" className="form-label">Storage Floor</label>
                                <select className="form-select" id="storage_floor" aria-label="Storage Floor">
                                    <option value="">-</option>
                                    <option value="1">1</option>
                                    <option value="2">2</option>
                                    <option value="4">4</option>
                                    <option value="5">5</option>
                                    <option value="6">6</option>
                                    <option value="7">7</option>
                                    <option value="8">8</option>
                                    <option value="9">9</option>
                                    <option value="10">10</option>
                                </select>
                            </div>

                            <div className="d-grid gap-2 mt-4">
                                <button type="button" className="btn btn-lg btn-primary">Next</button>
                            </div>
                        </form>
                    </div>

                    <br/><br/><br/>

                    <div className="end-details">
                        <h1 className="title">Varaa Kätevästi. Kuljeta helposti.</h1>
                        <form className="row g-3">
                            <div className="col-12">
                                <label htmlFor="end_address_number" className="form-label">Address Number</label>
                                <div className="input_wrap">
                                    <input className="form-control" type="text" id="end_address_number"
                                           placeholder="Address Number" />
                                </div>
                            </div>

                            <div className="col-12">
                                <label htmlFor="end_door_code" className="form-label">Door Code</label>
                                <div className="input_wrap">
                                    <input className="form-control" type="text" id="end_door_code"
                                           placeholder="Door Code" />
                                </div>
                            </div>

                            <div className="col-12">
                                <label htmlFor="end_floor" className="form-label">Select Floor</label>
                                <select className="form-select" id="end_floor" aria-label="Select Floor">
                                    <option value="">-</option>
                                    <option value="1">Maa-taso</option>
                                    <option value="2">Kerros 1</option>
                                    <option value="3">Kerros 2</option>
                                    <option value="4">Kerros 3</option>
                                    <option value="5">Kerros 4</option>
                                    <option value="6">Kerros 5</option>
                                    <option value="7">Kerros 6</option>
                                    <option value="8">Kerros 7</option>
                                    <option value="9">Kerros 8</option>
                                    <option value="10">Kerros 9</option>
                                    <option value="11">Kerros 10</option>
                                    <option value="12">Kerros 11</option>
                                    <option value="13">Kerros 12</option>
                                    <option value="14">Kerros 13</option>
                                    <option value="15">Kerros 14</option>
                                    <option value="16">Kerros 15</option>
                                    <option value="17">Kerros 16</option>
                                    <option value="18">Kerros 17</option>
                                    <option value="19">Kerros 18</option>
                                    <option value="20">Kerros 19</option>
                                    <option value="21">Kerros 20</option>
                                    <option value="22">Kerros 21</option>
                                    <option value="23">Kerros 22</option>
                                    <option value="24">Kerros 23</option>
                                    <option value="25">Kerros 24</option>
                                    <option value="26">Kerros 25</option>
                                    <option value="27">Kerros 26</option>
                                    <option value="28">Kerros 27</option>
                                    <option value="29">Kerros 28</option>
                                    <option value="30">Kerros 29</option>
                                    <option value="31">Kerros 30</option>
                                    <option value="32">Kerros 31</option>
                                    <option value="33">Kerros 32</option>
                                    <option value="34">Kerros 33</option>
                                    <option value="35">Kerros 34</option>
                                    <option value="36">Kerros 35</option>
                                    <option value="37">Kerros 36</option>
                                    <option value="38">Kerros 37</option>
                                    <option value="39">Kerros 38</option>
                                    <option value="40">Kerros 39</option>
                                </select>
                            </div>

                            <div className="col-12">
                                <label htmlFor="end_outdoor_distance" className="form-label">Outdoor Distance</label>
                                <select className="form-select" id="end_outdoor_distance" aria-label="Outdoor Distance">
                                    <option value="1">1 m</option>
                                    <option value="2">2 m</option>
                                    <option value="3">3 m</option>
                                    <option value="4">4 m</option>
                                    <option value="5">5 m</option>
                                    <option value="6">6 m</option>
                                    <option value="7">7 m</option>
                                    <option value="8">8 m</option>
                                    <option value="9">9 m</option>
                                    <option value="10">10 m</option>
                                    <option value="11">11 m</option>
                                    <option value="12">12 m</option>
                                    <option value="13">13 m</option>
                                    <option value="14">14 m</option>
                                    <option value="15">15 m</option>
                                    <option value="16">16 m</option>
                                    <option value="17">17 m</option>
                                    <option value="18">18 m</option>
                                    <option value="19">19 m</option>
                                    <option value="20">20 m</option>
                                    <option value="21">21 m</option>
                                    <option value="22">22 m</option>
                                    <option value="23">23 m</option>
                                    <option value="24">24 m</option>
                                    <option value="25">25 m</option>
                                    <option value="26">26 m</option>
                                    <option value="27">27 m</option>
                                    <option value="28">28 m</option>
                                    <option value="29">29 m</option>
                                    <option value="30">30 m</option>
                                    <option value="31">31 m</option>
                                    <option value="32">32 m</option>
                                    <option value="33">33 m</option>
                                    <option value="34">34 m</option>
                                    <option value="35">35 m</option>
                                    <option value="36">36 m</option>
                                    <option value="37">37 m</option>
                                    <option value="38">38 m</option>
                                    <option value="39">39 m</option>
                                    <option value="40">40 m</option>
                                </select>
                            </div>

                            <div className="col-12">
                                <label htmlFor="select_elevator" className="form-label">Select Elevator</label>
                                <select className="form-select" id="select_elevator" aria-label="Select Elevator">
                                    <option value="">-</option>
                                    <option value="1">Ei hissiä</option>
                                    <option value="2">Pieni hissi (alle 1m2)</option>
                                    <option value="3">Iso hisi (1m2 tai isompi)</option>
                                </select>
                            </div>

                            <div className="col-12">
                                <label htmlFor="end_storage" className="form-label">Storage</label>
                                <select className="form-select" id="end_storage" aria-label="Storage">
                                    <option value="">-</option>
                                    <option value="1">There is no warehouse</option>
                                    <option value="2">Basement closet / outdoor storage</option>
                                    <option value="3">Vintti / Ullakko</option>
                                </select>
                            </div>

                            <div className="col-12">
                                <label htmlFor="end_storage_area" className="form-label">Storage Area (m2)*</label>
                                <div className="input_wrap">
                                    <input className="form-control" type="text" id="end_storage_area"
                                           placeholder="Storage Area (m2)" />
                                </div>
                            </div>

                            <div className="col-12">
                                <label htmlFor="end_storage_floor" className="form-label">Storage Floor</label>
                                <select className="form-select" id="end_storage_floor" aria-label="Storage Floor">
                                    <option value="">-</option>
                                    <option value="1">1</option>
                                    <option value="2">2</option>
                                    <option value="4">4</option>
                                    <option value="5">5</option>
                                    <option value="6">6</option>
                                    <option value="7">7</option>
                                    <option value="8">8</option>
                                    <option value="9">9</option>
                                    <option value="10">10</option>
                                </select>
                            </div>

                            <div className="d-grid gap-2 mt-4">
                                <button type="button" className="btn btn-lg btn-primary">Next</button>
                            </div>
                        </form>
                    </div>

                    <br/><br/><br/>

                    <div className="companies-container">
                        <h1 className="title">Recommended Companies</h1>

                        <div className="row g-3">
                            <div className="col-12">
                                <div className="box-group company active">
                                    <div className="flex-grow-1">
                                        <div className="row">
                                            <div className="col-6">
                                                ABC
                                            </div>
                                            <div className="col-6">
                                                230 €
                                            </div>
                                        </div>
                                    </div>
                                    <button type="button" className="btn btn-outline-primary btn-sm">View</button>
                                </div>
                            </div>

                            <div className="col-12">
                                <div className="box-group company">
                                    <div className="flex-grow-1">
                                        <div className="row">
                                            <div className="col-6">
                                                ABC
                                            </div>
                                            <div className="col-6">
                                                230 €
                                            </div>
                                        </div>
                                    </div>
                                    <button type="button" className="btn btn-outline-primary btn-sm">View</button>
                                </div>
                            </div>

                            <div className="col-12">
                                <div className="box-group company">
                                    <div className="flex-grow-1">
                                        <div className="row">
                                            <div className="col-6">
                                                ABC
                                            </div>
                                            <div className="col-6">
                                                230 €
                                            </div>
                                        </div>
                                    </div>
                                    <button type="button" className="btn btn-outline-primary btn-sm">View</button>
                                </div>
                            </div>
                        </div>

                        <hr className="divider"/>

                        <h1 className="title">Other Companies</h1>

                        <div className="row g-3">
                            <div className="col-12">
                                <div className="box-group company">
                                    <div className="flex-grow-1">
                                        <div className="row">
                                            <div className="col-6">
                                                ABC
                                            </div>
                                            <div className="col-6">
                                                230 €
                                            </div>
                                        </div>
                                    </div>
                                    <button type="button" className="btn btn-outline-primary btn-sm">View</button>
                                </div>
                            </div>

                            <div className="col-12">
                                <div className="box-group company">
                                    <div className="flex-grow-1">
                                        <div className="row">
                                            <div className="col-6">
                                                ABC
                                            </div>
                                            <div className="col-6">
                                                230 €
                                            </div>
                                        </div>
                                    </div>
                                    <button type="button" className="btn btn-outline-primary btn-sm">View</button>
                                </div>
                            </div>

                            <div className="col-12">
                                <div className="box-group company">
                                    <div className="flex-grow-1">
                                        <div className="row">
                                            <div className="col-6">
                                                ABC
                                            </div>
                                            <div className="col-6">
                                                230 €
                                            </div>
                                        </div>
                                    </div>
                                    <button type="button" className="btn btn-outline-primary btn-sm">View</button>
                                </div>
                            </div>
                        </div>

                        <div className="text-center mt-4">
                            <button type="button" className="btn btn-lg btn-primary">Load more</button>
                        </div>
                    </div>


                    <br/><br/><br/>


                    <div className="transport-container">
                        <h1 className="title">Select transport</h1>

                        <div className="row g-3">
                            <div className="col-md-6">
                                <div className="box-group transport active">
                                    <div>
                                        <img className="vehicle" src="../assets/images/vehicle_type_1.jpg" />
                                    </div>

                                    <div className="flex-grow-1">
                                        <div className="row align-items-center">
                                            <div className="col-6">
                                                <div className="fs-15">1 Driver</div>
                                                <div className="fs-15">16 m<sup>3</sup></div>
                                            </div>
                                            <div className="col-6">
                                                <span className="fs-5">350 €</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="col-md-6">
                                <div className="box-group transport">
                                    <div>
                                        <img className="vehicle" src="../assets/images/vehicle_type_2.jpg" />
                                    </div>

                                    <div className="flex-grow-1">
                                        <div className="row align-items-center">
                                            <div className="col-6">
                                                <div className="fs-15">2 Driver</div>
                                                <div className="fs-15">20 m<sup>3</sup></div>
                                            </div>
                                            <div className="col-6">
                                                <span className="fs-5">350 €</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="col-md-6">
                                <div className="box-group transport">
                                    <div>
                                        <img className="vehicle" src="../assets/images/vehicle_type_3.jpg" />
                                    </div>

                                    <div className="flex-grow-1">
                                        <div className="row align-items-center">
                                            <div className="col-6">
                                                <div className="fs-15">2 Driver</div>
                                                <div className="fs-15">6 m<sup>3</sup></div>
                                            </div>
                                            <div className="col-6">
                                                <span className="fs-5">250 €</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="col-md-6">
                                <div className="box-group transport">
                                    <div>
                                        <img className="vehicle" src="../assets/images/vehicle_type_4.jpg" />
                                    </div>

                                    <div className="flex-grow-1">
                                        <div className="row align-items-center">
                                            <div className="col-6">
                                                <div className="fs-15">2 Driver</div>
                                                <div className="fs-15">6 m<sup>3</sup></div>
                                            </div>
                                            <div className="col-6">
                                                <span className="fs-5">250 €</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="text-center mt-4">
                            <button type="button" className="btn btn-lg btn-primary">Book now</button>
                        </div>
                    </div>


                    <br/><br/><br/>


                    <div className="payment-details">
                        <h1 className="title text-center">Payment Details</h1>

                        <h3 className="subtitle">Summary</h3>

                        <dl className="row">
                            <div className="col-md-6">
                                <div className="row">
                                    <dt className="col-md-3 col-4">Product:</dt>
                                    <dd className="col-md-9 col-8">2x</dd>

                                    <dt className="col-md-3 col-4">Van:</dt>
                                    <dd className="col-md-9 col-8">2 Persons.</dd>

                                    <dt className="col-md-3 col-4">Date:</dt>
                                    <dd className="col-md-9 col-8">31.01.2022. 09:30 h</dd>
                                </div>
                            </div>

                            <div className="col-md-6">
                                <div className="row">
                                    <dt className="col-md-5 col-4">Start address:</dt>
                                    <dd className="col-md-7 col-8">Syötä aloitusosoite</dd>

                                    <dt className="col-md-5 col-4">End Address:</dt>
                                    <dd className="col-md-7 col-8">Syötä aloitusosoite</dd>
                                </div>
                            </div>
                        </dl>

                        <hr className="divider"/>

                        <form className="row g-3">
                            <div className="col-sm-6">
                                <label htmlFor="first_name" className="form-label">First name</label>
                                <input className="form-control" type="text" id="first_name" placeholder="First name"/>
                            </div>
                            <div className="col-sm-6">
                                <label htmlFor="last_name" className="form-label">Last name</label>
                                <input className="form-control" type="text" id="last_name" placeholder="Last name"/>
                            </div>
                            <div className="col-sm-6">
                                <label htmlFor="email" className="form-label">Email</label>
                                <input className="form-control" type="email" id="email" placeholder="Email"/>
                            </div>
                            <div className="col-sm-6">
                                <label htmlFor="phone_number" className="form-label">Phone number</label>
                                <input className="form-control" type="text" id="phone_number" placeholder="Phone number"/>
                            </div>
                            <div className="col-12">
                                <label htmlFor="payment_method" className="form-label">Payment Method</label>
                                <select className="form-select" id="payment_method" aria-label="Select payment method">
                                    <option selected>option 1</option>
                                    <option value="1">option 2</option>
                                    <option value="2">option 3</option>
                                </select>
                            </div>

                            <div className="d-grid gap-2">
                                <button type="button" className="btn btn-lg btn-primary">Pay Now</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Demo;