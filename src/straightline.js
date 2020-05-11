import React, { Component } from 'react'
import { Input, Tag, Button, Alert } from 'antd';
import LineChart from 'react-linechart';
import Jumbotron from 'react-bootstrap/Jumbotron'
import '../node_modules/react-linechart/dist/styles.css';
export default class straightline extends Component {

    state = {
        x: "",
        y: "",
        points: [],
        isStraightLine: 0,
        isAlert: false
    }
    onChange = (e) => {
        this.setState({ [e.target.name]: e.target.value })
    }
    handleClose = async (removedTag) => {
        const tags = this.state.points.filter(tag => tag !== removedTag);
        await this.setState({ points: tags });
        await this.checkStraightLine()

    }
    checkStraightLine = async () => {
        const { points } = this.state
        if (this.state.points.length <= 1) {
            await this.setState({ isStraightLine: 0 })

        }
        if (points.length > 1) {
            var obj = 0, obj2 = 0, arr = this.state.points, brr = []
            for (let i = 0; i < arr.length - 1; i++) {
                obj = arr[i];
                obj2 = arr[i + 1];
                var x1 = obj.x;
                var y1 = obj.y;
                var x2 = obj2.x;
                var y2 = obj2.y;
                var m = (y2 - y1) / (x2 - x1);
                brr = [...brr, m]
            }
            var set = new Set(brr)
            var crr = Array.from(set)
            if (crr.length === 1 && this.state.points.length > 1) {
                await this.setState({ isStraightLine: 1 })
            }
            else {
                await this.setState({ isStraightLine: 2 })
            }
        }
    }
    buttonHandler = async (e) => {
        const { x, y, points } = this.state;
        if (x.length > 0 && y.length > 0) {
            this.setState({ isAlert: false })

            let obj = { x: parseInt(x), y: parseInt(y) }
            await this.setState({ points: [...points, obj], x: "", y: "" })
            await this.checkStraightLine()
        } else {
            this.setState({ isAlert: true })
        }

    }
    ShowAlert = () => {
        if (this.state.isAlert) {
            return <Alert message="Please check input Field" type="error" />

        }
    }
    render() {
        const data = [
            {
                color: "steelblue",
                points: this.state.points
            }
        ];
        return (
            <>
                <div className="container">
                    <div className="p-4 leetcode"><h1> LeetCode Challenge </h1></div>
                    <div className="p-2">
                        <Jumbotron>
                            <h3>
                                You are given an array coordinates, coordinates[i] = [x, y], where [x, y] represents the coordinate of a point. Check if these points make a straight line in the XY plane.
                            </h3>
                            <div className="p-2 input-container ">
                                <label>Enter Value of X and Y</label><br />
                                <Input
                                    style={{ width: "12vw", borderRadius: 50 }}
                                    // prefix={"x ="}
                                    name="x"
                                    placeholder="X"
                                    type="number"
                                    value={this.state.x}
                                    onChange={this.onChange} />
                                <span className="m-2">
                                    <Input
                                        style={{ width: "12vw", borderRadius: 50 }}
                                        // prefix={"y ="}
                                        name="y"
                                        placeholder="Y"

                                        type="number"
                                        value={this.state.y}
                                        onChange={this.onChange} />
                                </span>
                                <div className="p-2">
                                    {this.state.points &&
                                        this.state.points.map((element) => {
                                            return <Tag
                                                closable
                                                onClose={e => {
                                                    e.preventDefault();
                                                    this.handleClose(element);
                                                }}
                                            >(X:{element.x},Y:{element.y})</Tag>

                                        })}
                                </div>
                                {this.ShowAlert()}

                                <br />
                                <Button
                                    style={{ background: "blueviolet", color: "white" }}
                                    onClick={this.buttonHandler}
                                >
                                    Submit
                            </Button>

                            </div>

                            <div >
                                {this.state.points.length ? <div>
                                    <LineChart
                                        width={300}
                                        height={300}
                                        data={data}
                                    />
                                </div> : null}


                            </div>
                            <div className="p-5 font-family-poppins ans">
                                {this.state.isStraightLine === 1 ?
                                    <h4>Yes , This is Straight line</h4> :
                                    this.state.isStraightLine === 2 ?
                                        <h4>No ,This is not a Straight line</h4> :
                                        null

                                }
                            </div>
                            {/* </Jumbotron><Jumbotron> */}
                        </Jumbotron>

                    </div>
                </div>
            </>
        )
    }
}
