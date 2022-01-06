import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import * as d3 from 'd3';

@Component({
  selector: 'app-line-chart',
  templateUrl: './line-chart.component.html',
  styleUrls: ['./line-chart.component.scss']
})
export class LineChartComponent implements OnInit,OnChanges {
  margin = {top: 10, right: 30, bottom: 30, left: 60};
  data= [];
  @Input() chartocuppancy = {
    width : 1100,
    height : 300
  };
  @Input() Data = [];
  @Input() bottomaxis = [];
  @Input() Stocks = true;
  @Input() Sales = true;

  constructor() { }
  ngOnChanges(_changes: SimpleChanges) {
    if(this.Data && this.bottomaxis) {
      this.loadchart()
    }
  }

  ngOnInit(): void {
  }
  loadchart(){
    let Xdomain = this.bottomaxis;
    d3.select('#my_dataviz').html('');
    let svg = d3.select('#my_dataviz')
    .append("svg")
      .attr("width", this.chartocuppancy.width + this.margin.left + this.margin.right)
      .attr("height", this.chartocuppancy.height + this.margin.top + this.margin.bottom)
    .append("g")
      .attr("transform",
            "translate(" + this.margin.left + "," + this.margin.top + ")");
    let scalex = d3.scalePoint()
    .domain(Xdomain)
    .range([0,this.chartocuppancy.width]);
    let maxdata = [];
    this.Data.forEach(element => {
      let testdata = Object.values(element);
      testdata.splice(0,1);
      testdata.splice(0,1);
      maxdata.push(...testdata);
    });
    let maximumvalueforscale = Math.max(...maxdata);
    let scaley = d3.scaleLinear()
    .domain([0,maximumvalueforscale])
    .range([ this.chartocuppancy.height, 0 ]);

    let xaxis = d3.axisBottom(scalex);
    let yaxis = d3.axisLeft(scaley);

    svg.append("g")
    .attr("transform", "translate(0," + this.chartocuppancy.height + ")")
    .call(xaxis)

    svg.append("g")
    .call(yaxis)

  
  // for stocks  
  if(this.Stocks) {
  this.Data.forEach(element => {
    svg.append("path")
        .datum(this.bottomaxis)
        .attr("fill", "none")
        .attr("stroke", "steelblue")
        .attr("stroke-width", 1.5)
        .attr("d", d3.line()
          .x((d,i) => {
            return scalex(this.bottomaxis[i]) })
          .y((d,i) => {
            if(element[this.bottomaxis[i]+' - stocks']){
              return scaley(element[this.bottomaxis[i]+' - stocks']);
            } else {
              return scaley(0);
            }
          }));
    });
  }
 // for sales
if(this.Sales) {
 this.Data.forEach(element => {
  svg.append("path")
      .datum(this.bottomaxis)
      .attr("fill", "none")
      .attr("stroke", "red")
      .attr("stroke-width", 1.5)
      .attr("d", d3.line()
        .x((d,i) => {
          return scalex(this.bottomaxis[i]) })
        .y((d,i) => {
          if(element[this.bottomaxis[i]+' - sales']){
            return scaley(element[this.bottomaxis[i]+' - sales']);
          } else {
            return scaley(0);
          }
        }));
  });
}

  }
}