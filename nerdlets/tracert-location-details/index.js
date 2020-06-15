import React from 'react';
import PropTypes from 'prop-types';
import { navigation, BlockText, Icon, EntityByGuidQuery, Grid, GridItem, Spinner, EntityStorageQuery, EntityStorageMutation, NerdGraphQuery, NrqlQuery } from 'nr1'
import { PlatformStateContext, NerdletStateContext } from 'nr1';
// https://docs.newrelic.com/docs/new-relic-programmable-platform-introduction

export default class TracertLocationDetailsNerdlet extends React.Component {

    static contextType = NerdletStateContext;

    static propTypes = {
        location: PropTypes.any,
        accountId: PropTypes.any,
        nerdlet_beginTS: PropTypes.any,
        nerdlet_endTS: PropTypes.any,
        nerdlet_duration: PropTypes.any
    } //propTypes

    constructor(props) {
        super(props)

        this.state = {    
            location_data: null
            } //state
    } //constructor

    async _refreshLocationData() {

         // //get the entityGuid react context
         const __location = this.context.location;
         const __accountId = this.context.accountId;
            console.debug("account", __accountId);
            console.debug("account", __location);
        const __NRQL = `SELECT timestamp,fullHostname,Destination,hop1IP,hop1Time,hop2IP,hop2Time,hop3IP,hop3Time,hop4IP,hop4Time,hop5IP,hop5Time,hop6IP,hop6Time,hop7IP,hop7Time,hop8IP,hop8Time,hop9IP,hop9Time,hop10IP,hop10Time,hop11IP,hop11Time,hop12IP,hop12Time,hop13IP,hop13Time,hop14IP,hop14Time,hop15IP,hop15Time,hop16IP,hop16Time,hop17IP,hop17Time,hop18IP,hop18Time,hop19IP,hop19Time,hop20IP,hop20Time,hop21IP,hop21Time,hop22IP,hop22Time,hop23IP,hop23Time,hop24IP,hop24Time,hop25IP,hop25Time,hop26IP,hop26Time,hop27IP,hop27Time,hop28IP,hop28Time,hop29IP,hop29Time,hop30IP,hop30Time FROM WindowsTracert WHERE entityKey='${__location.key}' SINCE 60 MINUTES AGO limit MAX`;
        console.log("query", __NRQL);
        var __GRAPHQL = `{
            actor {
              account(id: ${__accountId}) {
                nrql(query: "${__NRQL}") {
                  results
                }
              }
            }
          }`;

        const __result = await NerdGraphQuery.query({query: __GRAPHQL});
console.debug("detail q", __result.data.actor.account.nrql.results);

        this.setState({location_data: __result.data.actor.account.nrql.results});  
    } //_refreshComponentData

    componentWillMount() {

        this._refreshLocationData();
    } //componentWillMount

    render() {

        console.debug("location data", this.state.location_data);
        if (this.state.location_data === null) {
            return(<Spinner/>);
        } //if
        else {
            return(
                <div>
                    <Grid>
                        <GridItem>
                            <table>
                                <thead>
                                    <tr>
                                        <th>Time Stamp</th>
                                        <th>Destination</th>
                                        <th>Hostname</th>
                                        <th>Hop 1</th>
                                        <th>Hop 1 (ms)</th>
                                        <th>Hop 2</th>
                                        <th>Hop 2 (ms)</th>
                                        <th>Hop 3</th>
                                        <th>Hop 3 (ms)</th>
                                        <th>Hop 4</th>
                                        <th>Hop 4 (ms)</th>
                                        <th>Hop 5</th>
                                        <th>Hop 5 (ms)</th>
                                        <th>Hop 6</th>
                                        <th>Hop 6 (ms)</th>
                                        <th>Hop 7</th>
                                        <th>Hop 7 (ms)</th>
                                        <th>Hop 8</th>
                                        <th>Hop 8 (ms)</th>
                                        <th>Hop 9</th>
                                        <th>Hop 9 (ms)</th>
                                        <th>Hop 10</th>
                                        <th>Hop 10 (ms)</th>
                                        <th>Hop 11</th>
                                        <th>Hop 11 (ms)</th>
                                        <th>Hop 12</th>
                                        <th>Hop 12 (ms)</th>
                                        <th>Hop 13</th>
                                        <th>Hop 13 (ms)</th>
                                        <th>Hop 14</th>
                                        <th>Hop 14 (ms)</th>
                                        <th>Hop 15</th>
                                        <th>Hop 15 (ms)</th>
                                        <th>Hop 16</th>
                                        <th>Hop 16 (ms)</th>
                                        <th>Hop 17</th>
                                        <th>Hop 17 (ms)</th>
                                        <th>Hop 18</th>
                                        <th>Hop 18 (ms)</th>
                                        <th>Hop 19</th>
                                        <th>Hop 19 (ms)</th>
                                        <th>Hop 20</th>
                                        <th>Hop 20 (ms)</th>
                                        <th>Hop 21</th>
                                        <th>Hop 21 (ms)</th>
                                        <th>Hop 22</th>
                                        <th>Hop 22 (ms)</th>
                                        <th>Hop 23</th>
                                        <th>Hop 23 (ms)</th>
                                        <th>Hop 24</th>
                                        <th>Hop 24 (ms)</th>
                                        <th>Hop 25</th>
                                        <th>Hop 25 (ms)</th>
                                        <th>Hop 26</th>
                                        <th>Hop 26 (ms)</th>
                                        <th>Hop 27</th>
                                        <th>Hop 27 (ms)</th>
                                        <th>Hop 29</th>
                                        <th>Hop 29 (ms)</th>
                                        <th>Hop 30</th>
                                        <th>Hop 30 (ms)</th>
                                    </tr>
                                    {this.state.location_data.map(_location =>{
                                        var cts = _location.timestamp,
                                          cdate = (new Date(cts)).toLocaleString();
                                        return(
                                            <tr>
                                                <td>{cdate}</td>
                                                <td>{_location.Destination}</td>
                                                <td>{_location.fullHostname}</td>
                                                <td>{_location.hop1IP}</td>
                                                <td>{_location.hop1Time}</td>
                                                <td>{_location.hop2IP}</td>
                                                <td>{_location.hop2Time}</td>
                                                <td>{_location.hop3IP}</td>
                                                <td>{_location.hop3Time}</td>
                                                <td>{_location.hop4IP}</td>
                                                <td>{_location.hop4Time}</td>
                                                <td>{_location.hop5IP}</td>
                                                <td>{_location.hop5Time}</td>
                                                <td>{_location.hop6IP}</td>
                                                <td>{_location.hop6Time}</td>
                                                <td>{_location.hop7IP}</td>
                                                <td>{_location.hop7Time}</td>
                                                <td>{_location.hop8IP}</td>
                                                <td>{_location.hop8Time}</td>
                                                <td>{_location.hop9IP}</td>
                                                <td>{_location.hop9Time}</td>
                                                <td>{_location.hop10IP}</td>
                                                <td>{_location.hop10Time}</td>
                                                <td>{_location.hop11IP}</td>
                                                <td>{_location.hop11Time}</td>
                                                <td>{_location.hop12IP}</td>
                                                <td>{_location.hop12Time}</td>
                                                <td>{_location.hop13IP}</td>
                                                <td>{_location.hop13Time}</td>
                                                <td>{_location.hop14IP}</td>
                                                <td>{_location.hop14Time}</td>
                                                <td>{_location.hop15IP}</td>
                                                <td>{_location.hop15Time}</td>
                                                <td>{_location.hop16IP}</td>
                                                <td>{_location.hop16Time}</td>
                                                <td>{_location.hop17IP}</td>
                                                <td>{_location.hop17Time}</td>
                                                <td>{_location.hop18IP}</td>
                                                <td>{_location.hop18Time}</td>
                                                <td>{_location.hop19IP}</td>
                                                <td>{_location.hop19Time}</td>
                                                <td>{_location.hop20IP}</td>
                                                <td>{_location.hop20Time}</td>
                                                <td>{_location.hop21IP}</td>
                                                <td>{_location.hop21Time}</td>
                                                <td>{_location.hop22IP}</td>
                                                <td>{_location.hop22Time}</td>
                                                <td>{_location.hop23IP}</td>
                                                <td>{_location.hop23Time}</td>
                                                <td>{_location.hop24IP}</td>
                                                <td>{_location.hop24Time}</td>
                                                <td>{_location.hop25IP}</td>
                                                <td>{_location.hop25Time}</td>
                                                <td>{_location.hop26IP}</td>
                                                <td>{_location.hop26Time}</td>
                                                <td>{_location.hop27IP}</td>
                                                <td>{_location.hop27Time}</td>
                                                <td>{_location.hop28IP}</td>
                                                <td>{_location.hop28Time}</td>
                                                <td>{_location.hop29IP}</td>
                                                <td>{_location.hop29Time}</td>
                                                <td>{_location.hop30IP}</td>
                                                <td>{_location.hop30Time}</td>
                                            </tr>
                                        )
                                    })}
                                </thead>
                            </table>
                        </GridItem>
                    </Grid>
                </div>
            );
        }
    } //render
} //TracertLocationDetailsNerdlet
