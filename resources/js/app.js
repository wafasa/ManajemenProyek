
/**
 * First we will load all of this project's JavaScript dependencies which
 * includes Vue and other libraries. It is a great starting point when
 * building robust, powerful web applications using Vue and Laravel.
 */

require('./bootstrap');

// window.Vue = require('vue');

/**
 * Next, we will create a fresh Vue application instance and attach it to
 * the page. Then, you may begin adding components to this application
 * or customize the JavaScript scaffolding to fit your unique needs.
 */

// Vue.component('example-component', require('./components/ExampleComponent.vue'));

// const app = new Vue({
//     el: '#app'
// });
$(function(){
    $('body').scrollspy({target: "#historyApproved", offset: 50});
    
    $('#anggaranAcara').number(true,0);
    $(".social-login-box").height( $(".login-box").height() - 1000 );
    $('#tDosenDashboard').DataTable({
        processing: true,
        serverSide: true,
        ajax: "dosendashboard",
        drawCallback: function(settings){
            
            $('.btnValidate').click(function(){
                var idAcara = $(this).data('acara');
                
            
                swal({
                    title: "Acc Proposal?",
                    text: "Ketika sudah di ACC, tidak dapat dikembalikan kembali!",
                    icon: "warning",
                    buttons: true,
                    dangerMode: false,
                  })
                  .then((willDelete) => {
                    if (willDelete) {
                        $.ajax({
                            method: 'post',
                            url: "/accproposal",
                            data: {
                                id: idAcara,
                                _token: $('meta[name="csrf-token"]').attr('content')
                            }
                        })
                        .done(function(resp){
                            console.info("SUKSES");
                            console.info(resp);
                            swal("Telah di acc", {
                                icon: "success",
                            });
                            
                            setTimeout(() => {
                                location.reload();
                            }, 2000);          
                        })
                        .fail(function(resp){
                            console.error(resp);
                            console.log("GAGAL UPDATE");
                        });
            
                    } else {
                      swal("Proses ACC proposal dibatalkan");
                    }
                  });
            });

            $('.btnDecline').click(function(){
                var idAcara = $(this).data('acara');
                var namaAcara = $(this).parents("tr").children("td:first").text();
                $('#idAcara').val(idAcara);
                $('#card-title-comment').text(namaAcara);
            });
        },
        columns: [
            { data: 'namaAcara', name: 'namaAcara' },
            { data: 'temaAcara', name: 'temaAcara' },
            { data: 'tanggalAcara', name: 'tanggalAcara' },
            { data: 'tempatAcara', name: 'tempatAcara' },
            { data: 'username', name: 'username' },
            { data: 'anggaran', name: 'anggaran' },
            { data: 'pathFile', name: 'proposal' },
            { data: 'action', name: 'action'}
        ]
    });

    $('#tMahasiswa').DataTable({
        processing: true,
        serverSide: true,
        ajax: "dashboard/kegiatan/mahasiswa/index",
        columns: [
            { data: 'namaAcara', name: 'namaAcara' },
            { data: 'temaAcara', name: 'temaAcara' },
            { data: 'tanggalAcara', name: 'tanggalAcara' },
            { data: 'tempatAcara', name: 'tempatAcara' },
            { data: 'status', name: 'status'}
        ]
    })

    $('#tkMahasiswa').DataTable({
        processing: true,
        serverSide: true,
        ajax: "kegiatan/mahasiswa/dosen",
        drawCallback: function(settings){
            
            $('.btnValidateKegiatan').click(function(){
                var idAcara = $(this).data('acara');
                
            
                swal({
                    title: "Acc Kegiatan?",
                    text: "Ketika sudah di ACC, tidak dapat dikembalikan kembali!",
                    icon: "warning",
                    buttons: true,
                    dangerMode: false,
                  })
                  .then((willDelete) => {
                    if (willDelete) {
                        $.ajax({
                            method: 'post',
                            url: "kegiatan/mahasiswa/acc",
                            data: {
                                id: idAcara,
                                _token: $('meta[name="csrf-token"]').attr('content')
                            }
                        })
                        .done(function(resp){
                            console.info("SUKSES");
                            console.info(resp);
                            swal("Kegiatan berhasil di approve", {
                                icon: "success",
                            });
                            
                            setTimeout(() => {
                                location.reload();
                            }, 2000);          
                        })
                        .fail(function(resp){
                            console.error(resp);
                            console.log("GAGAL UPDATE");
                        });
            
                    } else {
                      swal("Proses ACC proposal dibatalkan");
                    }
                  });
            });
        },
        columns: [
            { data: 'namaAcara', name: 'namaAcara' },
            { data: 'temaAcara', name: 'temaAcara' },
            { data: 'tanggalAcara', name: 'tanggalAcara' },
            { data: 'tempatAcara', name: 'tempatAcara' },
            { data: 'scan', name: 'scan' },
            { data: 'status', name: 'status'}
        ]
        
    });

    $('#tDosenHistoryMahasiswa').DataTable({
        processing: true,
        serverSide: true,
        ajax: "kegiatan/mahasiswa/dosen/history",
        columns: [
            { data: 'namaAcara', name: 'namaAcara' },
            { data: 'temaAcara', name: 'temaAcara' },
            { data: 'tanggalAcara', name: 'tanggalAcara' },
            { data: 'tempatAcara', name: 'tempatAcara' },
            { data: 'scan', name: 'scan' },
            { data: 'updated_at', name: 'updated_at'}
        ]
    })

    $('#tUserManagement').DataTable({
        processing: true,
        serverSide: true,
        ajax: "dashboard/admin/userlist",
        drawCallback: function(settings){
            $('.btnAdminEditUser').click(function(){
                var idUser = $(this).data('user');
                
                $('#modalAdminEditUser').modal("show");
            });
        },
        columns: [
            { data: 'id', name: 'id' },
            { data: 'username', name: 'username' },
            { data: 'nama_role', name: 'nama_role'},
            { data: 'email', name: 'email' },
            { data: 'created_at', name: 'created_at' },
            { data: 'updated_at', name: 'updated_at'},
            { data: 'action', name: 'action'}
        ]
    });
})



$('#linkDosenHistory').click(function(event){
    $('#historyView').toggleClass('kosong');
    if (this.hash !== "") {
        // Prevent default anchor click behavior
        event.preventDefault();
  
        // Store hash
        var hash = this.hash;
  
        // Using jQuery's animate() method to add smooth page scroll
        // The optional number (800) specifies the number of milliseconds it takes to scroll to the specified area
        $('html, body').animate({
          scrollTop: $(hash).offset().top
        }, 800, function(){
     
          // Add hash (#) to URL when done scrolling (default click behavior)
          window.location.hash = hash;
        });
      }

    
    
    $('#tDosenHistory').DataTable({
        processing: true,
        serverSide: true,
        ajax: "dashboard/history",
        drawCallback: function(settings){
            
            $('.btnValidate').click(function(){
                var idAcara = $(this).data('acara');
                
            
                swal({
                    title: "Acc Proposal?",
                    text: "Ketika sudah di ACC, tidak dapat dikembalikan kembali!",
                    icon: "warning",
                    buttons: true,
                    dangerMode: false,
                  })
                  .then((willDelete) => {
                    if (willDelete) {
                        $.ajax({
                            method: 'post',
                            url: "/accproposal",
                            data: {
                                id: idAcara,
                                _token: $('meta[name="csrf-token"]').attr('content')
                            }
                        })
                        .done(function(resp){
                            console.info("SUKSES");
                            console.info(resp);
                            swal("Telah di acc", {
                                icon: "success",
                            });
                            
                            setTimeout(() => {
                                location.reload();
                            }, 2000);          
                        })
                        .fail(function(resp){
                            console.error(resp);
                            console.log("GAGAL UPDATE");
                        });
            
                    } else {
                      swal("Proses ACC proposal dibatalkan");
                    }
                  });
            });

            $('.btnDecline').click(function(){
                var idAcara = $(this).data('acara');
                var namaAcara = $(this).parents("tr").children("td:first").text();
                $('#idAcara').val(idAcara);
                $('#card-title-comment').text(namaAcara);
            });
        },
        columns: [
            { data: 'namaAcara', name: 'namaAcara' },
            { data: 'temaAcara', name: 'temaAcara' },
            { data: 'tanggalAcara', name: 'tanggalAcara' },
            { data: 'tempatAcara', name: 'tempatAcara' },
            { data: 'username', name: 'username' },
            { data: 'anggaran', name: 'anggaran' },
            { data: 'pathFile', name: 'proposal' },
            { data: 'action', name: 'action'}
        ]
    });
});
// Button ketika ormawa ingin mengedit inputan kegiatan
$('.btnEditOrmawa').click(function(){
    $('#exampleModalLabel').html("Edit");
    $('#edit_namaAcara').attr('readonly',false);
    $('#edit_temaAcara').attr('readonly',false);
    $('#edit_tanggalAcara').attr('readonly',false);
    $('#edit_tempatAcara').attr('readonly',false);
    $('#edit_berkasAcara').attr('readonly',false);
    $('#edit_anggaranAcara').attr('readonly',false);

    if($('#btnProcess').hasClass('kosong')){
        $('#btnProcess').removeClass('kosong');
    }
    $('#view_berkasAcara').addClass('kosong');
    var idkegiatanOrmawa = $(this).data('acaraedit');
    
    var edit_namaacara = $('#edit_namaAcara');
    var edit_temaAcara = $('#edit_temaAcara');
    var edit_tanggalAcara = $('#edit_tanggalAcara');
    var edit_tempatAcara = $('#edit_tempatAcara');
    var edit_berkasAcara = $('#edit_berkasAcara');
    if(edit_berkasAcara.hasClass('kosong')){
        edit_berkasAcara.removeClass('kosong');
    }
    var edit_anggaranAcara = $('#edit_anggaranAcara');
    var edit_idacara = $('#edit_idacara');

    $.ajax({
        url:'dashboard/ormawa/edit/'+idkegiatanOrmawa,
        method: 'get',
        dataType: 'json'
    })
    .done(function(resp){
        
        $.each(resp, function(index, val){
            var anggaran = val.anggaran;
            var filename = val.fileName;
            var idacara = val.id;
            var namaAcara = val.namaAcara;
            var tanggalacara = val.tanggalAcara;
            var temaAcara = val.temaAcara;
            var tempatacara = val.tempatAcara;
            
            var tgl = moment(tanggalacara).format('YYYY-MM-DD');
            edit_idacara.val(idacara);
            edit_namaacara.val(namaAcara);
            edit_temaAcara.val(temaAcara);
            edit_tanggalAcara.val(tgl);
            edit_tempatAcara.val(tempatacara);
            edit_anggaranAcara.val(anggaran);
            
        });
    })
    .fail(function(err){

    })
});

$('.btnViewOrmawa').click(function(){
    var idkegiatanOrmawa = $(this).data('acaraview');
    
    $('#btnProcess').addClass('kosong');
    $('#edit_namaAcara').attr('readonly','readonly');
    $('#edit_temaAcara').attr('readonly','readonly');
    $('#edit_tanggalAcara').attr('readonly','readonly');
    $('#edit_tempatAcara').attr('readonly','readonly');
    $('#edit_berkasAcara').attr('readonly','readonly');
    $('#edit_anggaranAcara').attr('readonly','readonly');
    $('#view_berkasAcara').attr('readonly','readonly');

    var idkegiatanOrmawa = $(this).data('acaraview');
    
    var edit_namaacara = $('#edit_namaAcara');
    var edit_temaAcara = $('#edit_temaAcara');
    var edit_tanggalAcara = $('#edit_tanggalAcara');
    var edit_tempatAcara = $('#edit_tempatAcara');
    var edit_berkasAcara = $('#edit_berkasAcara');

    edit_berkasAcara.addClass('kosong');

    if($('#view_berkasAcara').hasClass('kosong')){
        $('#view_berkasAcara').removeClass('kosong');
    }
    var edit_anggaranAcara = $('#edit_anggaranAcara');
    var edit_idacara = $('#edit_idacara');

    $.ajax({
        url:'dashboard/ormawa/edit/'+idkegiatanOrmawa,
        method: 'get',
        dataType: 'json'
    })
    .done(function(resp){
        
        $.each(resp, function(index, val){
            var anggaran = val.anggaran;
            var filename = val.fileName;
            var idacara = val.id;
            var namaAcara = val.namaAcara;
            var tanggalacara = val.tanggalAcara;
            var temaAcara = val.temaAcara;
            var tempatacara = val.tempatAcara;
            
            var tgl = moment(tanggalacara).format('YYYY-MM-DD');
            edit_idacara.val(idacara);
            edit_namaacara.val(namaAcara);
            edit_temaAcara.val(temaAcara);
            edit_tanggalAcara.val(tgl);
            edit_tempatAcara.val(tempatacara);
            edit_anggaranAcara.val(anggaran);
            $('#view_berkasAcara').val(filename);
        });
    })
    .fail(function(err){

    })
    $('#exampleModalLabel').html("View");
    $('#exampleModal').modal('show');
})
$('.btnRevisiacara').click(function(){
    var revisiacara_id = $(this).data('revisiacara');
    var comment_section = $('.revisicomment-'+revisiacara_id);
    var judul_section = $('.judulrevisi-'+revisiacara_id);
    

    $.ajax({
        url: 'dashboard/revisi/commendid/'+revisiacara_id,
        method: 'get',
        dataType: 'json',
    })
    .done(function(resp){
        
        $.each(resp, function(index,val){
            
            comment_section.html(val.comment);
            judul_section.html(val.judulrevisi);
        });
    })
    .fail(function(err){

    });
});

$('#tUserManagement tbody').on( 'click', 'button', function () {
    var t = $('#tUserManagement').DataTable();
    var selected_row= t.row($(this).parents('tr')).data();
    console.log(selected_row);

    var usernameEdit = selected_row['username'];
    var emailEdit = selected_row['email'];
    var passwordEdit = selected_row['password'];
    var idEdit = selected_row['id'];
    var roleId_edit = selected_row['roleid'];

    $('#id_admin_edit').val(idEdit);
    $('#username_admin_edit').val(usernameEdit);
    $('#email_admin_edit').val(emailEdit);
    $('#role_admin_edit').val(roleId_edit);


    
});