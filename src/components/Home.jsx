import React from 'react';
import { Grid, Image } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { Translate } from 'react-redux-i18n';

import detect from 'assets/img/icon1.png';
import stats from 'assets/img/icon2.png';
import settings from 'assets/img/icon3.png';
import geodata from 'assets/img/icon4.png';

export default () => (
    <div>
        <Grid stackable columns={3} className="nt-dashboard-grid">
            <Grid.Row>
                <Grid.Column><Image src={detect} as={Link} to="/monitor" className="home-img" /><div><h2><Link to="/monitor"><Translate value={'pages.monitor'} /></Link></h2> <p><Translate value={'pages.monitor_note'} /></p></div></Grid.Column>
                <Grid.Column><Image src={stats} as={Link} to="/statistics" className="home-img" /><div><h2><Link to="/statistics"><Translate value={'pages.statistics'} /></Link></h2> <p><Translate value={'pages.statistics_note'} /></p></div></Grid.Column>
                <Grid.Column><Image src={geodata} as={Link} to="/geodata" className="home-img" /><div><h2><Link to="/geodata"><Translate value={'pages.geodata'} /></Link></h2> <p><Translate value={'pages.geodata_note'} /></p></div></Grid.Column>
            </Grid.Row>
        </Grid>
    </div>
);