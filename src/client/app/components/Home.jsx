import React from 'react';
import { Grid, Image } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

import detect from 'assets/img/icon1.png';
import stats from 'assets/img/icon2.png';
import settings from 'assets/img/icon3.png';

export default () => (
    <div>
        <Grid stackable columns={3} className="nt-dashboard-grid">
            <Grid.Row>
                <Grid.Column><Image src={detect} as={Link} to="/monitor" className="home-img" /><div><h2><Link to="/monitor">Наблюдение</Link></h2> <p>Анализ сетевого трафика и обнаружение атак.</p></div></Grid.Column>
                <Grid.Column><Image src={stats} as={Link} to="/statistics" className="home-img" /><div><h2><Link to="/statistics">Статистика</Link></h2> <p>Анализ и аудит исторических данных об атаках.</p></div></Grid.Column>
                <Grid.Column><Image src={settings} as={Link} to="/settings" className="home-img" /><div><h2><Link to="/settings">Настройки</Link></h2> <p>Изменение параметров системы обнаружения атак.</p></div></Grid.Column>
            </Grid.Row>
        </Grid>
    </div>
);