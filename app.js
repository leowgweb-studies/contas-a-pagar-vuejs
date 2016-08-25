Vue.filter('statusColor', function(count){
    if (count > 0){
        return "contas-a-pagar";
    }else if(count == 0){
        return "contas-pagas";
    }else{
        return "nenhuma-conta";
    }
});

Vue.filter('doneLabel', function(value){
    if(value == 0){
        return "Não Paga";
    }else{
        return "Paga";
    }
});

var app = new Vue({
    el: "#app",
    data: {
        title: "Contas a pagar",
        menus: [
            {id: 0, name: "Listar Contas"},
            {id: 1, name: "Criar Conta"}
        ],
        activedView: 1,
        countCheck: -1,
        formType: 'insert',
        bill: {
            date_due: '',
            name: '',
            value: 0,
            done: 0
        },
        names: [
            'Conta de Luz',
            'Conta de Água',
            'Supermercado',
            'Conta de Internet',
            'Aluguel',
            'Verstuário',
            'Cartão',
            'Faxina'
        ],
        bills: [
            {date_due: '20/08/2016', name: 'Conta de Luz', value: 25.50, done: 1},
            {date_due: '21/08/2016', name: 'Conta de Água', value: 70.50, done: 0},
            {date_due: '22/08/2016', name: 'Supermercado', value: 125.50, done: 0},
            {date_due: '23/08/2016', name: 'Conta de Internet', value: 99.50, done: 0},
            {date_due: '24/08/2016', name: 'Aluguel', value: 660.50, done: 0},
            {date_due: '25/08/2016', name: 'Verstuário', value: 78.50, done: 0},
            {date_due: '26/08/2016', name: 'Cartão', value: 1025.50, done: 0},
            {date_due: '27/08/2016', name: 'Faxina', value: 50.50, done: 0},
        ]
    },
    computed: {
        status: function(){
            this.countCheck = 0;
            for (var i in this.bills){
                if (!this.bills[i].done){
                    this.countCheck++;
                }
            }
            if (this.bills.length == 0){
                this.countCheck = -1;
                return "Nenhuma conta cadastrada";
            }else if(this.countCheck == 0){
                return "Nenhuma conta a pagar";
            }else{
                return "Existem "+ this.countCheck +" a serem pagas";
            }
        }
    },
    methods: {
        showView: function(id){
            this.activedView = id;
            if (id == 1){
                this.formType = 'insert';
            }
        },
        submit: function(){
            if (this.formType == 'insert'){
                this.bills.push(this.bill);
            }
            this.bill = {
                date_due: '',
                name: '',
                value: 0,
                done: 0
            };
            this.activedView = 0;
        },
        loadBill: function(bill){
            this.bill = bill;
            this.activedView = 1;
            this.formType = 'update'
        },
        removeBill: function(bill,i){
            var r = confirm("Tem certeza que deseja deletar "+bill.name);
            if (r == true){
                this.bills.splice(i,1);
            }
        },
        check: function(c){
            if (c.done == 0){
                this.done = 1;
            }else{
                this.done = 0;
            }
        }
    }
});