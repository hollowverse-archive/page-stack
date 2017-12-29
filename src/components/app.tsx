import * as React from 'react';
import { PageStack } from './PageStack/PageStack';
import { Page } from './PageStack/Page';

import './styles.scss';

const colorGenerator = (index: number) => {
  return [
    'Red',
    'Green',
    'Yellow',
    'Blue',
    'Orange',
    'Purple',
    'Cyan',
    'Magenta',
    'Lime',
    'Pink',
    'Teal',
    'Lavender',
    'Brown',
    'Beige',
    'Maroon',
    'Olive',
    'Coral',
    'Navy',
    'Grey',
  ][index];
};

export class App extends React.Component<any, any> {
  constructor(props: any) {
    super(props);

    this.state = {
      pages: [
        {
          props: {
            color: colorGenerator(0),
          },
        },
      ],
    };
  }

  renderPage = (page: any, index: any) => {
    return (
      <Page
        {...page.props}
        key={index}
        index={index}
        onPush={this.handlePush}
        onPop={this.handlePop}
      />
    );
  };

  handlePop = (index: number) => {
    const pages = this.state.pages.slice();

    pages.splice(index, 1);

    this.setState({
      pages,
    });
  };

  handlePush = () => {
    const pages = this.state.pages.slice();
    const color = colorGenerator(pages.length % 19);

    pages.push({
      props: {
        color,
      },
    });

    this.setState({
      pages,
    });
  };

  render() {
    return (
      <div className="apptsx">
        <PageStack>{this.state.pages.map(this.renderPage)}</PageStack>
      </div>
    );
  }
}
