const exec = require('child_process').exec;
module.exports = async function(txdata){
    this.execCommand = function (tmp) {
        return new Promise((resolve) => {
          
            if ((txdata.length == 50 ) && (txdata.match(/[a-zA-Z0-9]+$/))) {
                tmp = "haqqd q staking validators -o json --limit=1000 \| jq \'\.validators[] \| select(\.operator_address==\"" + txdata + "\" )' \| jq -r ";
            }
             else {
                tmp = false;
            }        
          if(tmp){
            exec(tmp, (error, stdout, stderr) => {
                if (error) {
                  console.error(`exec error: ${error}`);
                  resolve(stderr);
                }
                if (stderr) {
                    console.error(`stderr: ${stderr}`);
                    return;
                }
                resolve(stdout);
              });
          }else{
            var stdout = false
            resolve(stdout);
          }
        });
      };
    
    var lp = await this.execCommand()
    //console.log(lp)
    return lp
}