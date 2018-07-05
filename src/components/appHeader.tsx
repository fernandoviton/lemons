import * as React from 'react';

export interface AppHeaderProps {
    title: string;
    money: number;
    pageLinks: [{display: string, page: string}];
}

const getLinks = (props: AppHeaderProps) => props.pageLinks.map((pageLink, i, arr) => {
    const isLast = i === arr.length - 1;
    const className = (isLast ? 'mr-auto ' : '') + 'p-2 text-dark';
    return <a
        className={className}
        href={`/${pageLink.page}`}
        key={pageLink.display + '_' + pageLink.page}>
            <h5>{pageLink.display}</h5>
        </a>

});

export default (props: AppHeaderProps) => (
  <div className="d-flex align-items-center p-3 px-md-4 mb-3 border-bottom App-header">
    <a className="p-2" href="/"><h5>{props.title}</h5></a>
    { getLinks(props) }
    <h4 className="">${props.money}</h4>
  </div>);