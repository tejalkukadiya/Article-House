import React from 'react';

class TrendingSection extends React.Component {
  render() {
    const { trendingList } = this.props;
    return (
      <div className="row p-4">
        <div className="col">
          <h4>
            <strong>
              Trending Articles
            </strong>
          </h4>
          <hr />

          {trendingList && trendingList.data.length > 0 ?
            trendingList.data.map(article =>
              <div className="row">
                <div className="col-1">
                  <span><i className="fas fa-chart-line"></i></span>
                </div>
                <div className="col">
                  <p>{article.title} </p>
                </div>
              </div>
            )

            :
            <div className="row">
              <div className="col">
                <h4> Nothing in trending!! </h4>
              </div>
            </div>
          }

        </div>
      </div>
    )
  }
}

export default TrendingSection;