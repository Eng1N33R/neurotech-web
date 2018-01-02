import React from 'react';
import { Breadcrumb } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { Translate } from 'react-redux-i18n';

class Crumb extends React.Component {
    render() {
        const comps = this.props.location.pathname.split('/');
        if (comps[0] === comps[1]) return null;

        const paths = comps.map((comp, i, arr) => {
            if (i === 0) return {
                key: i,
                as: Link,
                to: '/',
                content: (<Translate value={'pages.home'} />),
                active: (i === arr.length - 1),
                link: (i < arr.length - 1)
            };

            if (i === arr.length - 1) return {
                key: i,
                content: (<Translate value={'pages.' + comp} />),
                active: (i === arr.length - 1)
            };

            return {
                key: i,
                as: Link,
                to: arr.slice(0, i + 1).join('/'),
                content: (<Translate value={'pages.' + comp} />),
                active: (i === arr.length - 1),
                link: (i < arr.length - 1)
            }
        });
        return (
            <div className="crumb">
                <Breadcrumb icon='chevron right' sections={paths} />
            </div>
        );
    }
}

export default Crumb;