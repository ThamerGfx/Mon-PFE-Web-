import React from 'react';
import {
    TableHead,
    TableSortLabel,
    TableCell,
    TableRow,
    Tooltip,
    withStyles
} from '@material-ui/core';

const rows = [
    {
        id            : 'nom_soc',
        align         : 'left',
        disablePadding: false,
        label         : 'Nom',
        sort          : true
    },
    {
        id            : 'adresse_soc',
        align         : 'left',
        disablePadding: false,
        label         : 'Adresse',
        sort          : true
    },
    {
        id            : 'SIREN',
        align         : 'left',
        disablePadding: false,
        label         : 'SIREN',
        sort          : true
    },
    {
        id            : 'contact_tel',
        align         : 'left',
        disablePadding: false,
        label         : 'Téléphone',
        sort          : true
    },
    {
        id            : 'contact_email',
        align         : 'left',
        disablePadding: false,
        label         : 'Email',
        sort          : true
    },
    {
        id            : 'actions',
        align         : 'left',
        disablePadding: false,
        label         : 'Actions',
        sort          : true
    },
   
];

const styles = theme => ({
    actionsButtonWrapper: {
        background: theme.palette.background.paper
    }
});

class ClientsTableHead extends React.Component {
    state = {
        selectedMenu: null
    };

    createSortHandler = property => event => {

        this.props.onRequestSort(event, property);
    };

    openSelectedProductsMenu = (event) => {
        this.setState({selectedMenu: event.currentTarget});
    };

    closeSelectedProductsMenu = () => {
        this.setState({selectedMenu: null});
    };
    render()
    {
        const {order, orderBy} = this.props;

        return (
            <TableHead>
                <TableRow className="h-64">
                    {rows.map(row => {
                        return (
                            <TableCell
                                key={row.id}
                                align={row.align}
                                padding={row.disablePadding ? 'none' : 'default'}
                                sortDirection={orderBy === row.id ? order : false}
                            >
                                {row.sort && (
                                    <Tooltip
                                        title="Sort"
                                        placement={row.align === "right" ? 'bottom-end' : 'bottom-start'}
                                        enterDelay={300}
                                    >
                                        <TableSortLabel
                                            active={orderBy === row.id}
                                            direction={order}
                                        >
                                            {row.label}
                                        </TableSortLabel>
                                    </Tooltip>
                                )}
                            </TableCell>
                        );
                    }, this)}
                </TableRow>
            </TableHead>
        );
    }
}

export default withStyles(styles, {withTheme: true})(ClientsTableHead);
