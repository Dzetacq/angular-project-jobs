import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'shortenContent'
})
export class ShortenContentPipe implements PipeTransform {

  transform(value: string, charCount?: number): unknown {
    if (value.length < (charCount ?? 250)) {
      return value;
    }
    return value.slice(0, charCount ?? 250) + " ...";
  }

}
