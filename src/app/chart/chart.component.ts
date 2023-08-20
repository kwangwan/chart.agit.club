import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js';
import { TwitchChatService } from '../common/service/twitch-chat.service';
import { ITwitchChatInput, ITwitchChatBuzzOutput, ITwitchChatMessageOutput } from '../common/dao/twitch-chat';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss']
})
export class ChartComponent implements OnInit {

  public chart: any;

  public defaultTwitchChatInput: ITwitchChatInput = {};
  public defaultChannelName?: string;
  public defaultTimeZone?: string;
  public defaultFixedInterval?: string;

  constructor (
    private modalService: NgbModal,
    private twitchChatService: TwitchChatService
  ) {}

  ngOnInit(): void {
    this.setDefaultTwitchChatInput();
    this.createChart();
  }

  public open(modal: any): void {
    this.modalService.open(modal);
  }

  setDefaultChannelName() {
    this.defaultChannelName = "nanayango3o";
  }

  setDefaultTimeZone() {
    const timeZoneMatch: RegExpMatchArray | null = new Date().toString().match(/([-\+][0-9]+)\s/);
    if (timeZoneMatch && timeZoneMatch.length >= 1) {
      this.defaultTimeZone = `${timeZoneMatch[1].slice(0,3)}:${timeZoneMatch[1].slice(3,5)}`;
    } else {
      this.defaultTimeZone = "+09:00";
    }
  }

  setDefaultFixedInterval() {
    this.defaultFixedInterval = "30m";
  }

  setDefaultTwitchChatInput() {
    this.setDefaultChannelName();
    this.setDefaultTimeZone();
    this.setDefaultFixedInterval();

    const dateTimeStart = new Date();
    dateTimeStart.setDate(dateTimeStart.getDate()-6);
    const dateTimeEnd = new Date();

    function getFormattedDate(date: Date): string {
      function getNum(num: number): string {
        if (num >= 10) {
          return num.toString();
        } else {
          return `0${num}`
        }
      }
      return `${getNum(date.getFullYear())}-${getNum(date.getMonth()+1)}-${getNum(date.getDate())} ${getNum(date.getHours())}:${date.getMinutes()}`;
    }

    this.defaultTwitchChatInput = {
      chartId: `${this.defaultChannelName} :: 1`,
      channelName: this.defaultChannelName,
      dateTimeStart: getFormattedDate(dateTimeStart),
      dateTimeEnd: getFormattedDate(dateTimeEnd),
      timeZone: this.defaultTimeZone,
      fixedInterval: this.defaultFixedInterval,
      shouldMatchPhrase: [],
      mustMatchPhrase: [],
      mustNotMatchPhrase: []
    };
  }

  async getChartData(twitchChatInput: ITwitchChatInput): Promise<ITwitchChatBuzzOutput> {
    console.log(twitchChatInput)
    const response: ITwitchChatBuzzOutput = await this.twitchChatService.getTwitchChatBuzz(twitchChatInput);
    return response;
  }

  async createChart(){
    const chartData: ITwitchChatBuzzOutput = await this.getChartData(this.defaultTwitchChatInput);
    const value = chartData.value??{};
    const labels = Object.keys(value);
    const chartId = chartData.chartId;
    let data: any[] = [];
    labels.forEach(label => {
      data.push(value[label]);
    });

    this.chart = new Chart("MainChart", {
      type: 'line',
      data: {
        labels: labels,
        datasets: [
          {
            label: chartId,
            data: data
          }
        ]
      },
      options: {
          aspectRatio:2.5
      }
    });
  }
}
