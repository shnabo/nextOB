import React, { Component } from 'react';
import BtnIssueCard from './BtnIssueCard';


// Each card in the "IssueBounty" tab is an IssueCard. This component takes the mapped information from GitHub and spits it out in the correct format.

class IssueCard extends Component {
  render() {
    console.log("Rendering");
    // Set Default Color as White (in case no Tech Match)
    let foundTechColor = "#FFF"

    // Pull data in from Colors.Json to compare to incoming GitHub information
    let data = require('../colors.json');

    // removes the space at the end of the incoming data to properly work with the FindTechColor function below.
    let repoTech = this.props.githubInfo1.repoTech[0].replace(/\s/g,'');


    // Find Color in colors.json that matches incoming github data from Props. Take the corresponding color - set to a variable, and put it into the SVG in the render.
    var findTechColor = function(obj){
      var colorList = [];
      for(let key in data[0]){
          colorList.push(key);
      }

      function compareTech() {   for (let i=0; i < colorList.length; i++){
          if (repoTech === colorList[i]){
          let techName = colorList[i];
          foundTechColor = data[0][techName].color;
          return
          }
        }
      }
      compareTech();
    }

    findTechColor();

    return (

        <div className="cardContainer col-xs-12">
          <div className="cardContentContainer col-xs-12 noPadd">

            <div className="leftSide col-xs-12 col-sm-8 noPadd">

              <div className="repoNameContainer col-xs-12">
                <p className="repoName">
                {this.props.githubInfo1.repoName}
                </p>
              </div>
              <div className="repoDiscContainer col-xs-12">
                <p className="repoDisc">
                {this.props.githubInfo1.repoDisc}
                </p>
              </div>
              <div className="repoTechContainer col-xs-12 col-md-6 row">
                <div className="techSVGContainer col-xs-1">
                  <svg className="techSVG" height="10" width="10">
                    <circle cx="5" cy="5" r="5"  strokeWidth="1" fill={foundTechColor} />
                  </svg>
                </div>
                <div className="repoTechTextContainer col-xs-9">
                  <p className="repoTech">
                  {this.props.githubInfo1.repoTech[0]}
                  </p>
                </div>
              </div>

            </div>

            <div className="rightSide col-xs-12 col-sm-4 noPadd">

              <div className="repoLastUpdateContainer col-xs-12">
              </div>

              <div className="issueCardButtonContainer col-xs-12">
                <BtnIssueCard  createTokenBtnHandler = {this.props.createTokenBtnHandler} manageRepo = {this.props.manageRepo} pageChange={(x)=> this.props.pageChange(x)} githubInfo1={this.props.githubInfo1} className="issueCardButton"/>
              </div>

            </div>

        </div>
      </div>

    );
  }
}

export default IssueCard;

// for Maping incoming data to repos (takes array called IssueBountiesRepos)
// {this.state.IssueBountiesRepos.map((Element,i) => <IssueBountiesCard key={i} Repos={Element}/>)}
