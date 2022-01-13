import { Component, Input, OnInit ,SimpleChanges } from '@angular/core';
import { ValueFormatterService } from 'ag-grid-community';
import * as d3 from 'd3';
import { element } from 'protractor';

@Component({
  selector: 'app-piechart',
  templateUrl: './piechart.component.html',
  styleUrls: ['./piechart.component.scss']
})
export class PiechartComponent implements OnInit {

  margin = {top: 10, right: 30, bottom: 30, left: 60};
  data= [];
  @Input() chartocuppancy = {
    width : 1100,
    height : 300
  };
  @Input() Data = []; 
  @Input() testclass = "dynamciclass";
  @Input() substring = "";
  svg: any;
  color: d3.ScaleOrdinal<string, unknown, never>;
  pie: d3.Pie<any, number | { valueOf(): number; }>;
  key: (d: any) => any;
  width: number;
  height: number;
  radius: number;
  host:any;
  pieData = [
   
  ];

  constructor() { }

  ngOnInit(): void {
  }
  ngOnChanges(_changes: SimpleChanges) {
    if(this.Data.length !== 0 && this.testclass !== "") {
    setTimeout(() => {
      this.loadchart();
    }, 10);
    }
  }
  loadchart(): void {
    this.pieData =[];
    this.Data.forEach(node => {
      let eachnode = {
        subproperty : node.subproperty,
        value:1,
      }

      Object.keys(node).forEach(element => {
        if(element.includes(this.testclass)) {
         eachnode.value += node[element];
        }
      });
      this.pieData.push(eachnode);
    });
    console.log(this.pieData);
    this.width = this.chartocuppancy.width;
    this.height =  this.chartocuppancy.height;
    this.radius = Math.min(this.width, this.height-40) / 2;
    let str = '.' + this.testclass;
    d3.select(str).html('');
    this.host = d3.select(str);
    let innerRadius = this.radius - 50;
    let outerRadius = this.radius - 10;
    
    this.svg = this.host.append("svg")
        .attr("viewBox", `0 0 ${this.width} ${this.height}`)
        .data([this.pieData])
        .attr('width', this.width)
        .attr('height', this.height)
        .append("g")
        .attr("transform", `translate(${this.width / 2},${this.height / 2})`);

        let pie = d3.pie().value((function(d: any) { return d}));
    let path = d3.arc().outerRadius( this.radius - 10).innerRadius(70);
    let label = d3.arc().outerRadius(this.radius + 10).innerRadius( this.radius - 10);
    let values = this.pieData.map(data => data.value);
    
    let arc = this.svg.selectAll('.arc')
        .data(pie(values))
        .enter()
        .append('g')
        .attr('class', 'arc');

    let pieColor = d3.scaleOrdinal(["Blue", "Teal", "Green", "Orange", "Purple", "Red", "Sienna"]); 

    arc.append('path')
        .attr('d', path)
        .attr('fill', function (d, i) {
            return pieColor(i);
        });
        arc.append("polyline")
        .attr("points", (d) => {
          var pos = label.centroid(d);
          pos[0] = this.radius * 0.95 * (this.midAngle(d) < Math.PI ? 1 : -1);
          return [path.centroid(d), label.centroid(d),pos];
        })
        .style("fill", "none")
        .style("stroke", (d,i)=>{
          return pieColor(i);
        })
        .style("stroke-width", "2px");

    arc.append("text")
        .attr("transform", (d: any) => {
          var pos = label.centroid(d);
          pos[0] = this.radius * 1.2 * (this.midAngle(d) < Math.PI ? 1 : -1);
            return "translate(" + pos + ")";
        })
        .text((d, index)=>{
         return this.pieData[index].subproperty + '(' + (this.pieData[index].value -1) + ')';
        })
        .style("text-anchor", "middle");
   
}
 midAngle(d) {
  return d.startAngle + (d.endAngle - d.startAngle) / 2;
}
}


