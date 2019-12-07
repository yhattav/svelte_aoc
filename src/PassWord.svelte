<script>
  import {passwordRangeStart,passwordRangeEnd,passwordLowestStartDigit,passwordHighestStartDigit} from './consts/passwords'
  

  function findPossiblePasswords(){
    let resArray = 1;
    console.log('sdfd');

    for (var a = passwordLowestStartDigit; a <= passwordHighestStartDigit; a++) {
      for (var b = a; b < 10; b++) {
        for (var c = b; c < 10; c++) {
          for (var d = c; d < 10; d++) {
            for (var e = d; e < 10; e++) {
              for (var f = e; f < 10; f++) {
                if ((a===b && b!==c) || (a!==b && b===c && c!==d) || (b!==c && c===d && d!==e) || (c!==d && d===e && e!==f) || (d!==e && e===f)) {
                  if(Number(''+a+b+c+d+e+f)>=passwordRangeStart && Number(''+a+b+c+d+e+f)<=passwordRangeEnd){
                    console.count('2nd part countzz')
                    console.log(''+a+b+c+d+e+f)
                  }
                }
              }
            }
          }
        }
      }
    }






    return resArray;
  }

</script>


<p>hey! the password range is :  {passwordRangeStart} to {passwordRangeEnd} {findPossiblePasswords()}</p>

