const exec = require('child_process').exec;
module.exports = async function(status){
    this.execCommand = function (tmp) {
        return new Promise((resolve) => {
            if (status == 'active') {
                tmp = "haqqd q staking validators -o json --limit=1000 \| jq \'\.validators[] \| select(\.status==\"BOND_STATUS_BONDED\")' \| jq -r \'\.tokens \+ \"\\t\" \+ \.description\.moniker \+ \"\\t\" \+ \.operator_address \+ \"\\t\" \+ \.commission\.commission_rates\.rate\' \| sort -gr \| nl";
            }
            else if (status == 'inactive'){
                tmp = "haqqd q staking validators -o json --limit=1000 \| jq \'\.validators[] \| select(\.status==\"BOND_STATUS_UNBONDING\" or \.status==\"BOND_STATUS_UNBONDED\")' \| jq -r \'\.tokens \+ \"\\t\" \+ \.description\.moniker \+ \"\\t\" \+ \.operator_address \+ \"\\t\" \+ \.commission\.commission_rates\.rate\' \| sort -gr \| nl";
            }
        
          
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
          
        });
      };
    
    var lp = await this.execCommand()
    return lp
}
