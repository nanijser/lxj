import React,{ Component } from 'react'
import { connect } from 'dva'
import CSSModules from 'react-css-modules'
import styles from './page.less'
import { Link } from 'react-router'
import classNames from 'classnames'
import { getCookie, setCookie, priceFormat } from 'libs/util'
import { fetchPosts } from "components/common/fetch"

class Home extends Component {
  levelOption = {"暂无":0,"C":25,"B":50,"A":75,"PRO":100,"":0}

  constructor(props) {
    super(props)
    fetchPosts("/lxj_api/navigation_list.htm",{},"GET")
      .then(data => {
        props.getLevel()
        props.getUserInfo()
        // props.getProjList()
      })

    this.state = {
      isShowCover: !getCookie("isShowCover","storage"),
      isGaugeRendered: false,
    }
  }

  showCoverHandler = (e) => {
    if (e) e.stopPropagation();
    this.setState({
      isShowCover: true
    });
  }

  hideCoverHandler = () => {
    setCookie("isShowCover","1","storage")
    this.setState({
      isShowCover: false
    });
  }



  componentDidMount() {

  }

  componentDidUpdate() {
    if( !!this.props.userInfo.level && !this.state.isGaugeRendered) {
      this.setState({
        isGaugeRendered: true
      });
    }
  }



  render() {
    // let projItems = this.props.projList.length>0 ? this.props.projList.map((item,index) => <ProjectItem projInfo={item} key={index} />) : ""
    return (
      <div styleName="home-container" style={this.props.style}>
        <div styleName="top-container">
          <div styleName="top-bg"></div>
          <div styleName="dash-container">
            <canvas id="dash" styleName="dash" width='240' height='210'></canvas>
          </div>
          <div styleName="content">
            <h5>QBII</h5>
            <h3>认证等级</h3>
            <h1 styleName={classNames({"nothing":this.props.userInfo.level&&this.props.userInfo.level=='暂无'})}>
              {this.props.userInfo.level}
            </h1>
            <p>等级越高，可投项目越多</p>
            <div styleName="btn-group">
              <span styleName="btn" onClick={()=>LXJFK.Business.go('/Theme')}>晒身份</span>
              <span styleName="btn" onClick={()=>LXJFK.Business.go('/About')}>了解QBII</span>
            </div>
          </div>
        </div>
        <div styleName="asset-container">
          <div styleName="item">
            <span>投入资产(元)</span>
            <h3>{priceFormat(this.props.userInfo.assets/100)||0.00} </h3>
          </div>
          <div styleName="item">
            <span>累计收益(元)</span>
            <h3>{priceFormat(this.props.userInfo.profit/100)||0.00}</h3>
          </div>
        </div>
        <div styleName="list-container" className={classNames({"hide":this.props.projList.length==0})}>
          {/* {projItems} */}
        </div>
        <div styleName="news-container">
          <div styleName="title">
            <div styleName="name">最新资讯</div>
            <div styleName="more">
              {/* 查看更多
              <i styleName="icon icon-arrow"></i> */}
            </div>
          </div>

        </div>
        <div styleName="bottom-container">
          <span>更多项目，敬请期待</span>
        </div>
        <div className="animated zoomIn" styleName={classNames("cover-container",{"active":this.state.isShowCover})}>
          <p>钱宝 5.0 <br/>开启你的资本之路</p>
          <div className="animated fadeIn" styleName="img"></div>
          <p styleName="txt">当前认证等级</p>
          <h1>{this.props.levelInfo.level}</h1>
          <span styleName="btn-join" onClick={this.hideCoverHandler}>即刻加入</span>
        </div>
      </div>
    )
  }
};

function mapStateToProps(state) {
    return state.home;
}

function mapDispatchToProps(dispatch) {
    return {
      getLevel(levelInfo){
          dispatch({type: 'home/getLevel', levelInfo});
      },
      getUserInfo(userInfo){
          dispatch({type: 'home/getUserInfo', userInfo});
      },
      getProjList(projList){
          dispatch({type: 'home/getProjList', projList});
      },
      getProgressInfo(progressInfo){
          dispatch({type: 'home/getProgressInfo', progressInfo});
      }
    }
}
Home.PropTypes = {
    enterAnimation: {
        duration: 2000,
        animation: "slideDown"
    },
    leaveAnimation:{
        duration: 2000,
        animation:"slideUp"
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CSSModules(Home,styles,{allowMultiple:true}));
