
function List(comparator){

//funzione di confronto di default che funziona che va bene per numeri e stringhe
if(comparator = undefined){
	comparator = function(a,b){
		return (a<b)-(b< a);
	}
}
class List{
	constructor(v,r){
		this.value = v;
		this.rest = r;
		return this;
	}
		/*
		//attraversamento della lista
		visit(){
			if(this.value === undefined){
				//nope
			}else{
				document.write(this.value + " ");
				//console.log(this.value);
				this.rest.visit();
			}
		}
		*/

	//numeri di elementi della lista
	size(){
		if(this.value === undefined){
			return 0;
		}else{
			return 1+this.rest.size();
		}
	}
	//concatena funziona
	toString(begin = "{"){
		if(this.value === undefined){
			return begin +"}";
		}else if(this.rest.value === undefined){
			return begin + this.value.toString()+"}";
		}else{
			return begin + this.value.toString()+","+this.rest.toString("");
		}
	}

	//inserimento in testa funziona
	push(v) {
		var r = new List(this.value, this.rest);
		this.value = v;
		this.rest = r;
		return this;
	}

	//stampa retrograda
	rvisit() {
			if(this.value === undefined){
				//nope
			}else{
				this.rest.rvisit();
				console.log(this.value+ " ");
			}
		}
		//inserimento in coda funziona
		append(v){
			if(this.value===undefined){
				this.value = v;
				this.rest = new List();
			}else{
				this.rest.append(v);
			}
		}

	//rimozione dalla testa funziona
		pop(){
			if(this.value === undefined){
				return undefined;
			}else{
				var result = this.value;
				this.value =this.rest.value;
				this.rest=this.rest.rest;
				return result;
			}
		}

	//rimozione dalla coda funziona
		remove(){
			if(this.value===undefined){
				//la lista è vuota
				return undefined;
			}else if(this.rest.value===undefined){
				//la lista non è vuota e questo è l'ultimo elemento
				var result = this.value;
				this.value=undefined;
				this.rest =undefined;
	      		return result;
			}else{
				//la lista non è vuota e questo non è l'ultimo elemento
				return this.rest.remove();
			}
		}

	//somma
		sum(){
			if(this.value===undefined){
				return 0;
			}else{
				return this.value + this.rest.sum();
			}
		}

		//produttoria
		prod(){
			if(this.value === undefined){
				return 1;
			}else{
				return this.value * this.rest.prod();
			}
		}

	//attraversamento(callback)
	visit(callback){
		if(this.empty()){
			//nope
		} else {
			if (callback) {
				callback(this.value);
			}else {
				console.log(this.value);
			}
			this.rest.visit(callback);
			}
	}
	//attraversamento con accumulo
	walk(callback, carry){
		if(this.empty()){
			return carry;
		}else{
			carry = callback(this.value, carry);
			return this.rest.walk(callback, carry);
		}
	}

	//attraversamento con modifica dei valori della lista
	map(callback){
		if(this.empty()){
				//nope
		}else{
			this.value =callback(this.value);
			this.rest.map;
		}
	}

		empty(){
			return this.value === undefined;
		}

	// clonare la lista
	clone(){
		if(this.empty){
			return new List();
		}else{
			var v = this.rest.clone;
			v.push(this.value);
			return v;
		}
	}

	// filtro
	Filter(callback){
		if(this.value === undefined){
			return new List();
		}else{
			var result = this.rest.Filter(callback);
			if(callback(this.value)) result.push(this.value);
			return result;
		}
	}
	split(by){
		if(this.value === undefined){
				return [new List(),new List()];
		}else{
			var[min,max]= this.rest.split(by);
			if(this.value <= by){
				min.push(this.value);
			}else{
				max.push(this.value);
			}
			return [min,max];
		}
	}
	sort(){
	    if(this.value === undefined || this.rest.value === undefined ){
				return;
	    }else{
	      var[min,max] = this.rest.split(this.value);
	      min.sort();
	      max.sort();
	      max.push(this.value);
	      min.concat(max);
	      this.replace(min);
	    }
	}

	concat(l){
		if(this.value === undefined){
	      this.replace(l);
	    }else{
	      this.rest.concat(l);
	    }
	}

	replace(l){
	    this.value = l.value;
	    this.rest = l.rest;
	}

	get(n){
		if(this.value === undefined){
			return undefined;
		}else if(n == 0){
			return this.value;
		}else{
			return this.rest.get(n-1);
		}
	}

	set(n,v){
		if(this.value === undefined){
			return false;
		}else if(n == 0){
			this.value = v;
			return true;
		}else{
			return this.rest.set(n-1,v)
		}
	}
		/*
	//restituisce la posizione dell'argomento nella lista
	indexOf(v){
		if(comparator(this.value,v){
			return NaN;
		}
		else{
			if(v == this.value){
				return i;
			}
			i++;
			this.rest.indexOf(v);
		}
	}
		*/
		random(n){
			if(n <= 0){
				this.push(Math.trunc(200*Math.random()-100));
				this.random(n-1);
			}
		}

	}
		return new List();

}
