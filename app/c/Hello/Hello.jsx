import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import history from '../../../tools/history'
import { Motion, spring } from 'react-motion';
export default class Hello extends Component {
    state = {
        y: 0
    }
    componentWillUnmount() {
        console.log('leave!!')
    }
    componentDidMount() {
    }
    start() {
        this.setState({
            y: -100
        })
    }
    render() {
        return (
            <div style={{ width: '100%', height: '100%' }}>
                <Motion onRest={()=>history.push('/edit')} defaultStyle={{ y: 0 }} style={{ y: spring(this.state.y) }}>
                    {
                        style => {
                            style = {
                                transform: `translateY(${style.y}%)`
                            }
                            return <div onTouchEnd={this.start.bind(this)} style={Object.assign(style, { textAlign: 'center', width: '100%', height: '100%', background: '#ee2344' })}>
                                <div style={{ display: 'inline-block', height: '100%', verticalAlign: 'middle' }} />
                                <div style={{ display: 'inline-block' }}>开始背单词<br />
                                </div>
                            </div>
                        }
                    }
                </Motion>
            </div>
        )
    }
}


