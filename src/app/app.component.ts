import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'calculator2-app';

  subText = '';
  mainText = '0';
  operand1: number;
  operand2: number;
  operator = '';
  calculationString = '';
  operatorSet = false;
  firstNumber = true;

  pressKey(key: string) 
  {
    if (key === '/' || key === 'x' || key === '-' || key === '+') 
    {
       if (this.firstNumber) 
       // if you want the number on screen (0 or the last result) as first number
       {
        this.operand1 = parseFloat(this.mainText);
        this.firstNumber = false;
       }
       const lastKey = this.mainText[this.mainText.length - 1];
       if (lastKey === '/' || lastKey === 'x' || lastKey === '-' || lastKey === '+')  
       {
         this.operatorSet = true;
       }
       if ((this.operatorSet) || (this.mainText === '')) 
       {
         return;
       }
       
       this.operator = key;
       this.operatorSet = true;
    }
    else // if it's a number
    {
      if (this.firstNumber) 
      {      
        this.mainText = "";
        this.operand1 = parseFloat(key);
        this.firstNumber = false;
      }
      
    }
    if (this.mainText.length === 10) 
    {
      return;
    }
    
    this.mainText += key;
 }

 getAnswer() 
 {
  this.calculationString = this.mainText;
  this.operand2 = parseFloat(this.mainText.split(this.operator)[1]);
  if (this.operator === '/') 
  {
    this.subText = this.mainText;
    this.mainText = (this.operand1 / this.operand2).toString();
    this.subText = this.calculationString;
    if (this.mainText.length > 9) 
    {
      this.mainText = this.mainText.substr(0, 9);
    }
  } 
  else if (this.operator === 'x') 
  {
    this.subText = this.mainText;
    this.mainText = (this.operand1 * this.operand2).toString();
    this.subText = this.calculationString;
    if (this.mainText.length > 9) 
    {
      this.mainText = 'ERROR';
      this.subText = 'Range Exceeded';
    }
  } 
  else if (this.operator === '-') 
  {
    this.subText = this.mainText;
    this.mainText = (this.operand1 - this.operand2).toString();
    this.subText = this.calculationString;
  } 
  else if (this.operator === '+') 
  {
    this.subText = this.mainText;
    this.mainText = (this.operand1 + this.operand2).toString();
    this.subText = this.calculationString;
    if (this.mainText.length > 9) 
    {
      this.mainText = 'ERROR';
      this.subText = 'Range Exceeded';
    }
  } 
  else 
  {
    this.subText = 'ERROR: Invalid Operation';
  }

  this.operand1 = parseFloat(this.mainText);
  this.operator = '';
  this.operatorSet = false;
  this.firstNumber = true;
}

allClear()
{
  this.subText = '';
  this.mainText = '0'
  this.calculationString = '';
  this.operatorSet = false;
  this.firstNumber = true;
}
}
