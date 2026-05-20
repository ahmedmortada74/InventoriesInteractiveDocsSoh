← Go back to 
[Inventories Module Documentation](/Inventories)

# adding_Stock.aspx

## Overview

**File**: `\Inventories\Process\adding_Stock.aspx`
**Purpose**: Stock addition approval system for inventory management with unit conversion and storage location management
**Technology**: ASP.NET Web Forms with DevExpress Bootstrap controls (v18.2)
**Primary Users**: Inventory supervisors, warehouse managers responsible for stock addition approvals

## User Input Requirements and Error Prevention

### Critical User Input Requirements

#### 1. **Document Number Input (Required for Search)**
- **Document Number Field**: Must enter valid document number for searching records
- **Error Prevention**: System validates document number is entered before search
- **Data Source**: User input with validation
- **Default Behavior**: User must enter document number manually
- **Error Message**: "الرجاء ادخال رقم المستند" (Please enter document number)
- **Validation**: Document number must be non-empty

#### 2. **Storage Unit Selection (Required for Addition)**
- **Storage Unit Dropdown**: Must select valid storage unit for item
- **Error Prevention**: System validates storage unit is selected before addition
- **Data Source**: Inventories_UOM table filtered by unit_type_id=3 and item code
- **Default Behavior**: User must select storage unit manually
- **Error Message**: "الرجاء ادخال وحدة التخزين" (Please enter storage unit)
- **Validation**: Only units with proper item associations are available

#### 3. **Usage Unit Selection (Required for Addition)**
- **Usage Unit Dropdown**: Must select valid usage unit for item
- **Error Prevention**: System validates usage unit is selected before addition
- **Data Source**: Inventories_UOM table filtered by unit_type_id=4 and item code
- **Default Behavior**: User must select usage unit manually
- **Error Message**: "الرجاء ادخال وحدة الصرف" (Please enter usage unit)
- **Validation**: Only units with proper item associations are available

#### 4. **Passage and Shelf Selection (Optional for Location)**
- **Passage Dropdown**: Optional selection for storage passage location
- **Shelf Dropdown**: Optional selection for storage shelf location
- **Error Prevention**: System allows empty selection for location
- **Data Source**: Inventories_wharehouse_passage and Inventories_wharehouse_Racks tables
- **Default Behavior**: Optional fields - can be left empty
- **Validation**: Only active passages and shelves are available

#### 5. **Record Selection (Required for Operations)**
- **Grid Row Selection**: Must select valid record from grid for operations
- **Error Prevention**: System validates record is selected before operations
- **Data Source**: Grid selection with validation
- **Default Behavior**: User must select record manually
- **Error Message**: "الرجاء اختيار السطر" (Please select row)
- **Validation**: Only one row can be selected at a time

### Common Error Scenarios and Prevention

#### **Document Number Errors**
- **Error**: "الرجاء ادخال رقم المستند" (Please enter document number)
- **Prevention**: Always enter document number before clicking search
- **Error**: No results found after search
- **Prevention**: Verify document number is correct and records exist

#### **Unit Selection Errors**
- **Error**: "الرجاء ادخال وحدة التخزين" (Please enter storage unit)
- **Prevention**: Always select storage unit before clicking addition approval
- **Error**: "الرجاء ادخال وحدة الصرف" (Please enter usage unit)
- **Prevention**: Always select usage unit before clicking addition approval
- **Error**: Unit dropdown empty
- **Prevention**: Ensure item has proper unit associations in UOM tables

#### **Record Selection Errors**
- **Error**: "الرجاء اختيار السطر" (Please select row)
- **Prevention**: Always select record before performing operations
- **Error**: Multiple rows selected
- **Prevention**: System enforces single row selection only

#### **Operation Errors**
- **Error**: Addition approval fails
- **Prevention**: Ensure all required fields are filled before approval
- **Error**: Edit/delete operations fail
- **Prevention**: Select record from approved additions grid

### Starting Points and Prerequisites

#### **Before Using This Page**
1. **User must be logged in** with valid authentication
2. **User must have addition approval permissions** via employee group assignments
3. **Document must exist** in Inventories_Examination_receipt with proper status
4. **Item master data must be complete** with UOM associations
5. **Storage location data must be configured** for warehouse management
6. **Examination and receipt must be completed** for items to be eligible for addition

#### **Required System State**
- User authentication must be active
- Department assignments must be configured
- Item master data must be current with UOM associations
- Storage location data must be current and active
- Examination and receipt workflow must be completed
- Document must have proper status (Examination_done=1, receipt_done=1, Adding_indator=0)

### Success Criteria

#### **For Document Search**
- ✅ Document number validation prevents search without number
- ✅ Search retrieves all eligible records for document
- ✅ Grid displays all examination receipt records
- ✅ Records filtered by examination and receipt completion status

#### **For Unit Selection**
- ✅ Storage unit validation prevents addition without unit
- ✅ Usage unit validation prevents addition without unit
- ✅ Unit filtering ensures only valid units for item
- ✅ Unit associations properly loaded from UOM tables

#### **For Addition Approval**
- ✅ Record selection validation prevents approval without selection
- ✅ Unit selection validation ensures proper unit assignment
- ✅ Addition status updated to approved (Adding_indator=1)
- ✅ User and timestamp tracking maintained

#### **For Location Management**
- ✅ Passage selection enables shelf filtering
- ✅ Shelf selection validates against selected passage
- ✅ Location data properly stored in record
- ✅ Location display shows in approved additions grid

#### **For Edit Operations**
- ✅ Edit selection validation prevents edit without selection
- ✅ Unit selection validation ensures proper unit assignment
- ✅ Location data properly updated
- ✅ Success feedback confirms completion

#### **For Delete Operations**
- ✅ Delete selection validation prevents delete without selection
- ✅ Addition status reset to pending (Adding_indator=0)
- ✅ Success feedback confirms completion
- **Note**: Delete does not reverse quantity changes

#### **For Data Management**
- ✅ Grid refreshes after all operations
- ✅ Selection clears after successful operations
- ✅ Success feedback confirms completion
- ✅ Button states update based on selection

## User Interface Components

### Main Control Panel

```html
<dx:BootstrapFormLayout runat="server" LayoutType="Vertical" dir="rtl" ID="BootstrapFormLayout">
```

**Form Layout**: Right-to-left (RTL) Bootstrap form layout with vertical structure for stock addition approval

### Document Search Section

```html
<!-- Document Search Controls -->
<dx:BootstrapLayoutGroup Caption="طلب الاضافة" SettingsItemCaptions-HorizontalAlign="Right" HorizontalAlign="Right" ColSpanMd="12">
    <Items>
        <!-- Department and Employee -->
        <dx:BootstrapLayoutItem Caption="الادارة" CaptionSettings-HorizontalAlign="Right" ColSpanMd="3">
            <ContentCollection>
                <dx:ContentControl>
                    <dx:BootstrapComboBox ID="Dep" runat="server" TextFormatString="{1} - {0}" AutoPostBack="True" Enabled="false" EnableMultiColumn="true" CallbackPageSize="15" EnableCallbackMode="false" DataSourceID="DepDS" ValueField="DepID" TextField="Dep_Name">
                        <Fields>
                            <dx:BootstrapListBoxField FieldName="DepID" />
                            <dx:BootstrapListBoxField FieldName="Dep_Name" />
                        </Fields>
                    </dx:BootstrapComboBox>
                </dx:ContentControl>
            </ContentCollection>
        </dx:BootstrapLayoutItem>

        <dx:BootstrapLayoutItem Caption="المسؤل" CaptionSettings-HorizontalAlign="Right" ColSpanMd="3">
            <ContentCollection>
                <dx:ContentControl>
                    <dx:BootstrapComboBox ID="ResponsableEmp" runat="server" TextFormatString="{0} - {1}" Enabled="false" AutoPostBack="True" EnableMultiColumn="true" CallbackPageSize="15" EnableCallbackMode="false" DataSourceID="Emp" ValueField="Emp_Code" TextField="User_Name">
                        <Fields>
                            <dx:BootstrapListBoxField FieldName="Emp_Code" />
                            <dx:BootstrapListBoxField FieldName="User_Name" />
                        </Fields>
                    </dx:BootstrapComboBox>
                </dx:ContentControl>
            </ContentCollection>
        </dx:BootstrapLayoutItem>

        <!-- Date and Document -->
        <dx:BootstrapLayoutItem Caption="تاريخ الطلب" CaptionSettings-HorizontalAlign="Right" ColSpanMd="2">
            <ContentCollection>
                <dx:ContentControl>
                    <dx:BootstrapDateEdit runat="server" Width="100%" ID="Calendar1" Enabled="false" OnDateChanged="Calendar1_DateChanged" AutoPostBack="true"></dx:BootstrapDateEdit>
                </dx:ContentControl>
            </ContentCollection>
        </dx:BootstrapLayoutItem>

        <dx:BootstrapLayoutItem Caption="رقم المستند" CaptionSettings-HorizontalAlign="Right" ColSpanMd="2">
            <ContentCollection>
                <dx:ContentControl>
                    <dx:BootstrapTextBox runat="server" Enabled="true" Width="100%" ID="txt_doc_no"></dx:BootstrapTextBox>
                </dx:ContentControl>
            </ContentCollection>
        </dx:BootstrapLayoutItem>

        <!-- Search Button -->
        <dx:BootstrapLayoutItem Caption="بحث" CaptionSettings-HorizontalAlign="Right" ColSpanMd="2">
            <ContentCollection>
                <dx:ContentControl>
                    <dx:BootstrapButton ID="search" runat="server" ClientInstanceName="btn5" Width="100%" Text=" بحث " OnClick="search_Click">
                        <ClientSideEvents Click="function(s, e) { DisableButton3(btn5,'btn5'); }" />
                        <CssClasses Icon="simple-icon-magnifier" />
                        <SettingsBootstrap RenderOption="Success" />
                    </dx:BootstrapButton>
                </dx:ContentControl>
            </ContentCollection>
        </dx:BootstrapLayoutItem>
    </Items>
</dx:BootstrapLayoutGroup>
```

### Unit Selection Section

```html
<!-- Unit and Location Selection -->
<dx:BootstrapLayoutGroup ShowCaption="False" SettingsItemCaptions-HorizontalAlign="Right" HorizontalAlign="Right" ColSpanMd="12">
    <Items>
        <!-- Storage Unit -->
        <dx:BootstrapLayoutItem Caption="وحدة التخزين" CaptionSettings-HorizontalAlign="Right" ColSpanMd="2">
            <ContentCollection>
                <dx:ContentControl>
                    <dx:BootstrapComboBox ID="storage_unit" runat="server" TextFormatString="{1} - {0}" AutoPostBack="True" enablemulticolumn="true" CallbackPageSize="15" OnSelectedIndexChanged="storage_unit_SelectedIndexChanged" EnableCallbackMode="True" DataSourceID="SqlDataSource2" ValueField="id" TextField="description">
                        <Fields>
                            <dx:BootstrapListBoxField FieldName="id" />
                            <dx:BootstrapListBoxField FieldName="description" />
                            <dx:BootstrapListBoxField FieldName="Quantity" />
                        </Fields>
                    </dx:BootstrapComboBox>
                </dx:ContentControl>
            </ContentCollection>
        </dx:BootstrapLayoutItem>

        <!-- Usage Unit -->
        <dx:BootstrapLayoutItem Caption="وحدة الصرف" CaptionSettings-HorizontalAlign="Right" ColSpanMd="2">
            <ContentCollection>
                <dx:ContentControl>
                    <dx:BootstrapComboBox ID="usage_unit" runat="server" TextFormatString="{1} - {0}" AutoPostBack="True" enablemulticolumn="true" CallbackPageSize="15" OnSelectedIndexChanged="usage_unit_SelectedIndexChanged" EnableCallbackMode="True" DataSourceID="SqlDataSource3" ValueField="id" TextField="description">
                        <Fields>
                            <dx:BootstrapListBoxField FieldName="id" />
                            <dx:BootstrapListBoxField FieldName="description" />
                            <dx:BootstrapListBoxField FieldName="Quantity" />
                        </Fields>
                    </dx:BootstrapComboBox>
                </dx:ContentControl>
            </ContentCollection>
        </dx:BootstrapLayoutItem>

        <!-- Storage Location -->
        <dx:BootstrapLayoutItem Caption="رقم الممر" CaptionSettings-HorizontalAlign="Right" ColSpanMd="2">
            <ContentCollection>
                <dx:ContentControl>
                    <dx:BootstrapComboBox ID="passive_id" runat="server" TextFormatString="{1}" AutoPostBack="True" enablemulticolumn="true" CallbackPageSize="15" OnSelectedIndexChanged="usage_unit_SelectedIndexChanged" EnableCallbackMode="false" DataSourceID="SqlDataSource4" ValueField="id" TextField="english_name">
                        <Fields>
                            <dx:BootstrapListBoxField FieldName="id" />
                            <dx:BootstrapListBoxField FieldName="english_name" />
                        </Fields>
                    </dx:BootstrapComboBox>
                </dx:ContentControl>
            </ContentCollection>
        </dx:BootstrapLayoutItem>

        <dx:BootstrapLayoutItem Caption="رقم الرف" CaptionSettings-HorizontalAlign="Right" ColSpanMd="2">
            <ContentCollection>
                <dx:ContentControl>
                    <dx:BootstrapComboBox ID="Shelf" runat="server" TextFormatString="{1}" AutoPostBack="True" enablemulticolumn="true" CallbackPageSize="15" OnSelectedIndexChanged="usage_unit_SelectedIndexChanged" EnableCallbackMode="false" DataSourceID="SqlDataSource33" ValueField="id" TextField="english_name">
                        <Fields>
                            <dx:BootstrapListBoxField FieldName="id" />
                            <dx:BootstrapListBoxField FieldName="english_name" />
                        </Fields>
                    </dx:BootstrapComboBox>
                </dx:ContentControl>
            </ContentCollection>
        </dx:BootstrapLayoutItem>
    </Items>
</dx:BootstrapLayoutGroup>
```

### Operation Buttons Section

```html
<!-- Operation Buttons -->
<dx:BootstrapLayoutGroup ShowCaption="False" SettingsItemCaptions-HorizontalAlign="Right" HorizontalAlign="Right" ColSpanMd="12">
    <Items>
        <!-- Addition Approval -->
        <dx:BootstrapLayoutItem ShowCaption="False" CaptionSettings-HorizontalAlign="Right" ColSpanMd="2" BeginRow="true">
            <ContentCollection>
                <dx:ContentControl>
                    <dx:BootstrapButton ID="Adding" runat="server" ClientInstanceName="btn4" Width="100%" Text=" تاكيد اذن الاضافة  " OnClick="Adding_Click">
                        <ClientSideEvents Click="function(s, e) { DisableButton3(btn4,'btn4'); }" />
                        <CssClasses Icon="simple-icon-magnifier" />
                        <SettingsBootstrap RenderOption="Success" />
                    </dx:BootstrapButton>
                </dx:ContentControl>
            </ContentCollection>
        </dx:BootstrapLayoutItem>

        <!-- Addition Rejection -->
        <dx:BootstrapLayoutItem ShowCaption="False" CaptionSettings-HorizontalAlign="Right" ColSpanMd="2">
            <ContentCollection>
                <dx:ContentControl>
                    <dx:BootstrapButton ID="reject" runat="server" ClientInstanceName="btn3" Width="100%" Text=" رفض اذن الاضافة " OnClick="reject_Click">
                        <ClientSideEvents Click="function(s, e) { DisableButton3(btn3,'btn3'); }" />
                        <CssClasses Icon="simple-icon-magnifier" />
                        <SettingsBootstrap RenderOption="Danger" />
                    </dx:BootstrapButton>
                </dx:ContentControl>
            </ContentCollection>
        </dx:BootstrapLayoutItem>

        <!-- Edit and Delete -->
        <dx:BootstrapLayoutItem ShowCaption="False" CaptionSettings-HorizontalAlign="Right" ColSpanMd="3">
            <ContentCollection>
                <dx:ContentControl>
                    <dx:BootstrapButton ID="edit_adding" runat="server" ClientInstanceName="btn2" Width="100%" Text=" تعديل  " Enabled="false" OnClick="edit_adding_Click">
                        <ClientSideEvents Click="function(s, e) { DisableButton3(btn2,'btn2'); }" />
                        <CssClasses Icon="simple-icon-magnifier" />
                        <SettingsBootstrap RenderOption="Primary" />
                    </dx:BootstrapButton>
                </dx:ContentControl>
            </ContentCollection>
        </dx:BootstrapLayoutItem>

        <dx:BootstrapLayoutItem ShowCaption="False" CaptionSettings-HorizontalAlign="Right" ColSpanMd="3">
            <ContentCollection>
                <dx:ContentControl>
                    <dx:BootstrapButton ID="delete_adding" runat="server" ClientInstanceName="btn1" Width="100%" Text=" حذف " Enabled="false" OnClick="delete_adding_Click">
                        <ClientSideEvents Click="function(s, e) { DisableButton3(btn1,'btn1'); }" />
                        <CssClasses Icon="simple-icon-magnifier" />
                        <SettingsBootstrap RenderOption="Dark" />
                    </dx:BootstrapButton>
                </dx:ContentControl>
            </ContentCollection>
        </dx:BootstrapLayoutItem>
    </Items>
</dx:BootstrapLayoutGroup>
```

### Data Grids Section

```html
<!-- Pending Additions Grid -->
<dx:BootstrapLayoutItem ShowCaption="False" CaptionSettings-HorizontalAlign="Right" ColSpanMd="12">
    <ContentCollection>
        <dx:ContentControl>
            <dx:BootstrapGridView runat="server" ID="grid_GridView1" ClientInstanceName="gridre" AutoGenerateColumns="false" AutoPostBack="True" KeyFieldName="ID" Styles-Cell-HorizontalAlign="Center" DataSourceID="SqlDataSource7" Styles-Cell-VerticalAlign="Middle" Styles-Header-VerticalAlign="Middle" Styles-Header-HorizontalAlign="Center" Font-Size="Small" EnableCallBacks="false" SettingsBehavior-AllowSelectSingleRowOnly="true" SettingsBehavior-ProcessFocusedRowChangedOnServer="true" SettingsBehavior-ProcessSelectionChangedOnServer="true" OnCustomColumnDisplayText="grid_GridView1_CustomColumnDisplayText" OnSelectionChanged="grid_GridView1_SelectionChanged1">
                <Settings ShowFilterRow="true" />
                <SettingsBehavior ProcessFocusedRowChangedOnServer="True"></SettingsBehavior>
                <SettingsDataSecurity AllowDelete="true" AllowInsert="False" AllowEdit="False" />
                <Columns>
                    <dx:BootstrapGridViewCommandColumn VisibleIndex="0" ShowSelectCheckbox="True" Width="30px"></dx:BootstrapGridViewCommandColumn>
                    <dx:BootstrapGridViewTextColumn FieldName="ID" ReadOnly="True" Visible="false" Caption="كود " VisibleIndex="0">
                        <SettingsEditForm Visible="False"></SettingsEditForm>
                    </dx:BootstrapGridViewTextColumn>
                    <dx:BootstrapGridViewTextColumn FieldName="NUM" Caption="مسلسل" VisibleIndex="0"></dx:BootstrapGridViewTextColumn>
                    <dx:BootstrapGridViewTextColumn FieldName="PO_ID_FK" Caption="امر التوريد" Visible="true" VisibleIndex="1"></dx:BootstrapGridViewTextColumn>
                    <dx:BootstrapGridViewTextColumn FieldName="full_Name" Caption="اسم  المورد" Visible="true" VisibleIndex="2"></dx:BootstrapGridViewTextColumn>
                    <dx:BootstrapGridViewTextColumn FieldName="Itemcode" Caption="كود الصنف" Visible="true" VisibleIndex="3"></dx:BootstrapGridViewTextColumn>
                    <dx:BootstrapGridViewTextColumn FieldName="arabic_name" Caption="مسمى الصنف" Visible="true" VisibleIndex="4"></dx:BootstrapGridViewTextColumn>
                    <dx:BootstrapGridViewTextColumn FieldName="Amount" Caption="الكمية" VisibleIndex="5"></dx:BootstrapGridViewTextColumn>
                    <dx:BootstrapGridViewTextColumn FieldName="Done_Amount" Caption="الكمية المستلم" VisibleIndex="6"></dx:BootstrapGridViewTextColumn>
                    <dx:BootstrapGridViewTextColumn FieldName="Remain_Amount" Caption="الكمية المتبقية" VisibleIndex="7"></dx:BootstrapGridViewTextColumn>
                    <dx:BootstrapGridViewTextColumn FieldName="Store_id" Caption=" المخزن الافتراضى" Visible="true" VisibleIndex="8"></dx:BootstrapGridViewTextColumn>
                    <dx:BootstrapGridViewTextColumn FieldName="PO_DemandAmount" Caption="كمية امر الشراء" Visible="false" VisibleIndex="9"></dx:BootstrapGridViewTextColumn>
                    <dx:BootstrapGridViewTextColumn FieldName="Price_unit" Caption="سعر الوحدة" VisibleIndex="10"></dx:BootstrapGridViewTextColumn>
                    <dx:BootstrapGridViewTextColumn FieldName="Total_Price" Caption="اجمالى السعر" Visible="false" VisibleIndex="11"></dx:BootstrapGridViewTextColumn>
                    <dx:BootstrapGridViewTextColumn FieldName="Discount" Caption="الخصم" Visible="false" VisibleIndex="12"></dx:BootstrapGridViewTextColumn>
                    <dx:BootstrapGridViewTextColumn FieldName="Grand_Total" Caption="صافى السعر" VisibleIndex="13"></dx:BootstrapGridViewTextColumn>
                    <dx:BootstrapGridViewTextColumn FieldName="description" Caption="وحدة الشراء" VisibleIndex="14"></dx:BootstrapGridViewTextColumn>
                    <dx:BootstrapGridViewTextColumn FieldName="uom_deliver_unit" Caption="وحدة الاستلام" VisibleIndex="15"></dx:BootstrapGridViewTextColumn>
                    <dx:BootstrapGridViewDateColumn FieldName="Expiration_date" Caption="تاريخ الصلاحية" VisibleIndex="16"></dx:BootstrapGridViewDateColumn>
                    <dx:BootstrapGridViewTextColumn FieldName="Purchase_Id_unit" Caption="رقم وحدة الشراء" Visible="false" VisibleIndex="17"></dx:BootstrapGridViewTextColumn>
                    <dx:BootstrapGridViewTextColumn FieldName="delivery_id_unit" Caption="رقم وحدة الاستلام" Visible="false" VisibleIndex="18"></dx:BootstrapGridViewTextColumn>
                    <dx:BootstrapGridViewTextColumn FieldName="doc_id" Caption="رقم المستند" Visible="false" VisibleIndex="20"></dx:BootstrapGridViewTextColumn>
                    <dx:BootstrapGridViewTextColumn FieldName="batch_no" Caption="رقم المستند" Visible="false" VisibleIndex="21"></dx:BootstrapGridViewTextColumn>
                    <dx:BootstrapGridViewTextColumn FieldName="inv_num" Caption="رقم الفاتورة" Visible="false" VisibleIndex="23"></dx:BootstrapGridViewTextColumn>
                    <dx:BootstrapGridViewTextColumn FieldName="fk_check" Caption="رقم اللجنة" Visible="false" VisibleIndex="24"></dx:BootstrapGridViewTextColumn>
                </Columns>
                <Settings VerticalScrollableHeight="350" />
                <SettingsPager PageSize="50">
                    <PageSizeItemSettings Visible="true" ShowAllItem="true" />
                </SettingsPager>
                <Settings ShowFilterRow="True" ShowGroupPanel="true"></Settings>
                <SettingsBehavior ProcessFocusedRowChangedOnServer="True" ProcessSelectionChangedOnServer="true"></SettingsBehavior>
                <SettingsPager Mode="ShowPager" PageSize="8"></SettingsPager>
            </dx:BootstrapGridView>
        </dx:ContentControl>
    </ContentCollection>
</dx:BootstrapLayoutItem>

<!-- Approved Additions Grid -->
<dx:BootstrapLayoutItem ShowCaption="False" CaptionSettings-HorizontalAlign="Right" ColSpanMd="12">
    <ContentCollection>
        <dx:ContentControl>
            <dx:BootstrapGridView runat="server" ID="Bootstrap_end_adding" ClientInstanceName="gridre" AutoGenerateColumns="false" KeyFieldName="ID" AutoPostBack="True" Styles-Cell-HorizontalAlign="Center" DataSourceID="SqlDataSource1" Styles-Cell-VerticalAlign="Middle" Styles-Header-VerticalAlign="Middle" Styles-Header-HorizontalAlign="Center" Font-Size="Small" EnableCallBacks="false" SettingsBehavior-AllowSelectSingleRowOnly="true" SettingsBehavior-ProcessFocusedRowChangedOnServer="false" SettingsBehavior-ProcessSelectionChangedOnServer="false" OnCustomColumnDisplayText="grid_GridView1_CustomColumnDisplayText" OnSelectionChanged="Bootstrap_end_adding_SelectionChanged">
                <Settings ShowFilterRow="true" />
                <SettingsBehavior ProcessFocusedRowChangedOnServer="True"></SettingsBehavior>
                <SettingsDataSecurity AllowDelete="true" AllowInsert="False" AllowEdit="False" />
                <Columns>
                    <dx:BootstrapGridViewCommandColumn VisibleIndex="0" ShowSelectCheckbox="True" Width="30px"></dx:BootstrapGridViewCommandColumn>
                    <dx:BootstrapGridViewTextColumn FieldName="ID" ReadOnly="True" Visible="false" Caption="كود " VisibleIndex="0">
                        <SettingsEditForm Visible="False"></SettingsEditForm>
                    </dx:BootstrapGridViewTextColumn>
                    <dx:BootstrapGridViewTextColumn FieldName="NUM" Caption="مسلسل" VisibleIndex="0"></dx:BootstrapGridViewTextColumn>
                    <dx:BootstrapGridViewTextColumn FieldName="PO_ID_FK" Caption="امر التوريد" Visible="true" VisibleIndex="1"></dx:BootstrapGridViewTextColumn>
                    <dx:BootstrapGridViewTextColumn FieldName="full_Name" Caption="اسم  المورد" Visible="true" VisibleIndex="3"></dx:BootstrapGridViewTextColumn>
                    <dx:BootstrapGridViewTextColumn FieldName="Itemcode" Caption="كود الصنف" Visible="true" VisibleIndex="4"></dx:BootstrapGridViewTextColumn>
                    <dx:BootstrapGridViewTextColumn FieldName="arabic_name" Caption="مسمى الصنف" Visible="true" VisibleIndex="5"></dx:BootstrapGridViewTextColumn>
                    <dx:BootstrapGridViewTextColumn FieldName="Amount" Caption="الكمية" VisibleIndex="6"></dx:BootstrapGridViewTextColumn>
                    <dx:BootstrapGridViewTextColumn FieldName="Done_Amount" Caption="الكمية المستلم" VisibleIndex="7"></dx:BootstrapGridViewTextColumn>
                    <dx:BootstrapGridViewTextColumn FieldName="Remain_Amount" Caption="الكمية المتبقية" VisibleIndex="8"></dx:BootstrapGridViewTextColumn>
                    <dx:BootstrapGridViewTextColumn FieldName="Store_id" Caption=" المخزن الافتراضى" Visible="true" VisibleIndex="9"></dx:BootstrapGridViewTextColumn>
                    <dx:BootstrapGridViewTextColumn FieldName="PO_DemandAmount" Caption="كمية امر الشراء" Visible="false" VisibleIndex="10"></dx:BootstrapGridViewTextColumn>
                    <dx:BootstrapGridViewTextColumn FieldName="Price_unit" Caption="سعر الوحدة" VisibleIndex="11"></dx:BootstrapGridViewTextColumn>
                    <dx:BootstrapGridViewTextColumn FieldName="Total_Price" Caption="اجمالى السعر" Visible="false" VisibleIndex="12"></dx:BootstrapGridViewTextColumn>
                    <dx:BootstrapGridViewTextColumn FieldName="Discount" Caption="الخصم" Visible="false" VisibleIndex="13"></dx:BootstrapGridViewTextColumn>
                    <dx:BootstrapGridViewTextColumn FieldName="Grand_Total" Caption="صافى السعر" VisibleIndex="14"></dx:BootstrapGridViewTextColumn>
                    <dx:BootstrapGridViewTextColumn FieldName="description" Caption="وحدة الشراء" VisibleIndex="15"></dx:BootstrapGridViewTextColumn>
                    <dx:BootstrapGridViewTextColumn FieldName="uom_deliver_unit" Caption="وحدة الاستلام" VisibleIndex="16"></dx:BootstrapGridViewTextColumn>
                    <dx:BootstrapGridViewDateColumn FieldName="Expiration_date" Caption="تاريخ الصلاحية" VisibleIndex="17"></dx:BootstrapGridViewDateColumn>
                    <dx:BootstrapGridViewTextColumn FieldName="passage_id" Caption="الممر" Visible="true" VisibleIndex="26"></dx:BootstrapGridViewTextColumn>
                    <dx:BootstrapGridViewTextColumn FieldName="shelf_id" Caption="الرف" Visible="true" VisibleIndex="27"></dx:BootstrapGridViewTextColumn>
                    <dx:BootstrapGridViewTextColumn FieldName="uom_storage_unit" Caption="وحدة التخزين" Visible="true" VisibleIndex="29"></dx:BootstrapGridViewTextColumn>
                    <dx:BootstrapGridViewTextColumn FieldName="uom_Exchange_unit" Caption="وحدة الصرف" Visible="true" VisibleIndex="30"></dx:BootstrapGridViewTextColumn>
                    <dx:BootstrapGridViewTextColumn FieldName="delivery_q" Caption="الكمية بوحدة الاستلام" Visible="true" VisibleIndex="6"></dx:BootstrapGridViewTextColumn>
                    <dx:BootstrapGridViewTextColumn FieldName="storage_q" Caption="الكمية بوحدة التخزين" Visible="true" VisibleIndex="6"></dx:BootstrapGridViewTextColumn>
                    <dx:BootstrapGridViewTextColumn FieldName="exchange_q" Caption="الكمية بوحدة الاستخدام" Visible="true" VisibleIndex="6"></dx:BootstrapGridViewTextColumn>
                </Columns>
                <Settings VerticalScrollableHeight="350" />
                <SettingsPager PageSize="50">
                    <PageSizeItemSettings Visible="true" ShowAllItem="true" />
                </SettingsPager>
                <Settings ShowFilterRow="True" ShowGroupPanel="true"></Settings>
                <SettingsBehavior ProcessFocusedRowChangedOnServer="True" ProcessSelectionChangedOnServer="true"></SettingsBehavior>
                <SettingsPager Mode="ShowPager" PageSize="8"></SettingsPager>
            </dx:BootstrapGridView>
        </dx:ContentControl>
    </ContentCollection>
</dx:BootstrapLayoutItem>
```

## Data Flow Architecture

### Query String Parameters

The system uses document number parameters for comprehensive data filtering:

**Document Number Parameters**:
- `@doc` - Document ID for filtering examination receipt records

### Data Retrieval Process

1. **Page Load**: Sets up user context and loads default data
2. **Document Search**: Validates document number and retrieves eligible records
3. **Unit Loading**: Loads storage and usage units based on selected item
4. **Location Loading**: Loads passages and shelves based on selected store
5. **Addition Operations**: Approves, rejects, edits, or deletes addition requests
6. **Grid Updates**: Refreshes both pending and approved addition grids

## Key Methods

### Page_Load Method

```csharp
protected void Page_Load(object sender, EventArgs e)
```

**Purpose**: Initializes page controls and loads default data

**Process**:
1. Sets up user context from authentication cookies
2. Sets minimum date for calendar control
3. Sets current date as default for calendar
4. Auto-populates department and employee information
5. Disables calendar editing (date is informational only)

### search_Click Method

```csharp
protected void search_Click(object sender, EventArgs e)
```

**Purpose**: Executes search with validation and data retrieval

**Process**:
1. Validates document number is entered
2. Sets document number parameter for both data sources
3. Binds both grids with filtered data
4. Clears all selections after search
5. Provides user feedback for validation failures

### Adding_Click Method

```csharp
protected void Adding_Click(object sender, EventArgs e)
```

**Purpose**: Approves stock addition with unit and location assignment

**Process**:
1. Validates record selection
2. Validates document number
3. Validates storage and usage unit selection
4. Updates addition status to approved (Adding_indator=1)
5. Records user, timestamp, and unit assignments
6. Optionally records passage and shelf location
7. Provides success feedback and refreshes grids

### reject_Click Method

```csharp
protected void reject_Click(object sender, EventArgs e)
```

**Purpose**: Rejects stock addition and reverses quantity allocation

**Process**:
1. Validates record selection
2. Validates document number
3. Updates addition status to rejected (Adding_indator=2)
4. Records user and timestamp
5. Reverses quantity allocation in PO order details
6. Provides success feedback and refreshes grids

### edit_adding_Click Method

```csharp
protected void edit_adding_Click(object sender, EventArgs e)
```

**Purpose**: Edits approved addition with new unit and location assignments

**Process**:
1. Validates record selection from approved additions grid
2. Validates document number
3. Validates storage and usage unit selection
4. Updates addition record with new unit and location assignments
5. Records user and timestamp
6. Provides success feedback and refreshes grids
7. Resets button states and clears form fields

### delete_adding_Click Method

```csharp
protected void delete_adding_Click(object sender, EventArgs e)
```

**Purpose**: Deletes approved addition and resets status to pending

**Process**:
1. Validates record selection from approved additions grid
2. Validates document number
3. Validates storage and usage unit selection
4. Resets addition status to pending (Adding_indator=0)
5. Records user and timestamp
6. Provides success feedback and refreshes grids
7. Resets button states and clears form fields

## Database Integration

### Core Database Tables

#### **Inventories_Examination_receipt**
- **Purpose**: Stores examination and receipt records for stock additions
- **Key Fields**: ID, PO_ID_FK, Itemcode, Done_Amount, Adding_indator, storage_Id_unit, Exchange_id_unit, passage_id, shelf_id
- **Status Values**: Adding_indator=0 (pending), 1 (approved), 2 (rejected)
- **Usage**: Main table for stock addition approval workflow

#### **Inventories_UOM**
- **Purpose**: Unit of measure master data
- **Key Fields**: id, description, active
- **Unit Types**: unit_type_id=2 (delivery), 1 (purchase), 3 (storage), 4 (exchange)
- **Usage**: Provides unit options for different operations

#### **Inventories_UOM_item_unit**
- **Purpose**: Item-unit associations with conversion factors
- **Key Fields**: item_code, unit_id, Quantity, unit_type_id
- **Usage**: Links items to units with conversion factors for quantity calculations

#### **Purchese_PO_Order_Details**
- **Purpose**: Purchase order detail quantities and allocations
- **Key Fields**: PO_ID_FK, itemcode, Done_Amount, Remain_Amount
- **Usage**: Tracks quantity allocations that need reversal on rejection

#### **Inventories_wharehouse_passage**
- **Purpose**: Warehouse passage master data
- **Key Fields**: id, english_name, Store_id, active
- **Usage**: Provides passage options for storage location

#### **Inventories_wharehouse_Racks**
- **Purpose**: Warehouse rack/shelf master data
- **Key Fields**: id, english_name, passage_id, active
- **Usage**: Provides shelf options filtered by passage

#### **Purchese_PO_Order_Header**
- **Purpose**: Purchase order header information
- **Key Fields**: id, Sup_Code_fk
- **Usage**: Links to supplier information for display

#### **purches_Supplier_record**
- **Purpose**: Supplier master data
- **Key Fields**: Supplier_code, Arabic_name
- **Usage**: Displays supplier information in grids

### Permission and Authorization

#### **User Authentication**
```csharp
HttpCookie userinfo = Request.Cookies["user"];
user = userinfo["code"].ToString();
ResponsableEmp.Value = userinfo["code"].ToString();
```

**Authentication Logic**: Retrieves user information from authentication cookies
**User Context**: Sets employee code and department from user profile
**Validation**: Ensures user is authenticated before accessing addition operations

#### **Department Assignment**
```csharp
Dep.Value = cn.ExcuteSQL2("SELECT DepID,Dep_Name FROM DefinitionDep WHERE DepID in (SELECT top 1 EmpDepartment FROM DefinitionEmployee1 WHERE(EmpID = N'" + userinfo["code"].ToString() + "'))");
```

**Department Logic**: Auto-populates department based on user's employee record
**Validation**: Ensures user has valid department assignment
**Usage**: Provides context for addition operations

#### **Record Filtering**
```sql
SELECT Inventories_Examination_receipt.ID, PO_ID_FK, Itemcode, Amount, Done_Amount, Remain_Amount, PO_DemandAmount, Price_unit, Total_Price, Discount, Grand_Total, Store_id, Purchase_Id_unit, Inventories_UOM.description, delivery_id_unit, uom.description as uom_deliver_unit, Expiration_date, batch_no, indicator, Emp_code, date_time, fk_check, Examination_done, receipt_done, doc_id, inv_num
FROM Inventories_Examination_receipt inner join Inventories_UOM on Inventories_UOM.id=Inventories_Examination_receipt.delivery_id_unit
inner join Inventories_UOM as uom on uom.id=Inventories_Examination_receipt.Purchase_Id_unit
inner join Purchese_PO_Order_Header on Purchese_PO_Order_Header.id=Inventories_Examination_receipt.PO_ID_FK
inner join purches_Supplier_record on purches_Supplier_record.Supplier_code=Purchese_PO_Order_Header.Sup_Code_fk
inner join Inventories_Item_Settings ss on ss.item_code=Inventories_Examination_receipt.Itemcode
where doc_id=@doc and Examination_done='1' and receipt_done='1' and Adding_indator='0' and Adding_rev_indator='0'
```

**Filter Logic**: Shows only records that are eligible for addition approval
**Status Logic**: Examination_done=1, receipt_done=1, Adding_indator=0, Adding_rev_indator=0
**Usage**: Filters pending addition requests for approval

## Client-Side JavaScript

### Button Disable Function

```javascript
function DisableButton3(buttonnameobject, buttonnamestring) {
    window.setTimeout(buttonnamestring + ".SetEnabled(false)", 0);
    var x = buttonnameobject;
    x.SetText("Please wait...");
}
```

**Button Logic**: Disables button and changes text during processing
**User Experience**: Prevents duplicate clicks and provides processing feedback
**Usage**: Applied to all operation buttons to prevent multiple submissions

### Checkbox Selection Logic

```javascript
function CheckOne(obj) {
    var grid = obj.parentNode.parentNode.parentNode;
    var inputs = grid.getElementsByTagName("input");
    for (var i = 0; i < inputs.length; i++) {
        if (inputs[i].type == "checkbox") {
            if (obj.checked && inputs[i] != obj && inputs[i].checked) {
                inputs[i].checked = false;
            }
        }
    }
}
```

**Selection Logic**: Ensures only one checkbox can be selected at a time
**Grid Logic**: Works within grid context to manage row selection
**Usage**: Applied to grid checkboxes for single selection behavior

### Master-Detail Grid Handling

```javascript
function MasterGrid_DetailRowCollapsing(s, e) {
    var key = masterGrid.GetRowKey(e.visibleIndex);
    hf.Set('collapsedRowKey', key);
}
function MasterGrid_EndCallback(s, e) {
    if (hf.Contains('collapsedRowKey'))
        hf.Remove('collapsedRowKey');
}
```

**Grid Features**: Master-detail grid functionality with collapsible rows
**State Management**: Client-side state management for collapsed rows
**Server Integration**: Coordinates with server-side event handling

### Popup and Callback Handling

```javascript
var keyValue;
function OnMoreInfoClick(element, key) {
    callbackPanel.SetContentHtml("");
    popup.ShowAtElement(element);
    keyValue = key;
}
function popup_Shown(s, e) {
    callbackPanel.PerformCallback(keyValue);
}
```

**Popup Logic**: Shows popup at clicked element with callback functionality
**Data Loading**: Loads detailed data via callback when popup is shown
**User Experience**: Provides seamless detail viewing without page refresh

### Browser Security

```javascript
function noBack() { window.history.forward(); }
noBack();
window.onload = noBack;
window.onpageshow = function (evt) { if (evt.persisted) noBack(); }
window.onunload = function () { void (0); }
```

**Security Logic**: Prevents browser back button navigation
**Session Management**: Ensures proper session handling
**User Experience**: Maintains application state and security

## Page Structure and Components

### Master Page Integration
- **MasterPageFile**: `~/MasterPage/MainMaster.Master`
- **Bootstrap Framework**: DevExpress Web.Bootstrap v18.2
- **Form Layout**: BootstrapFormLayout with RTL (right-to-left) direction
- **Language**: Arabic interface with RTL layout

### Key Sections and Functionality

#### **1. Document Search Section**
```html
<!-- Document Search Controls -->
<dx:BootstrapLayoutGroup Caption="طلب الاضافة" SettingsItemCaptions-HorizontalAlign="Right" HorizontalAlign="Right" ColSpanMd="12">
    <Items>
        <!-- Department and Employee -->
        <dx:BootstrapLayoutItem Caption="الادارة" CaptionSettings-HorizontalAlign="Right" ColSpanMd="3">
        <dx:BootstrapLayoutItem Caption="المسؤل" CaptionSettings-HorizontalAlign="Right" ColSpanMd="3">
        <!-- Date and Document -->
        <dx:BootstrapLayoutItem Caption="تاريخ الطلب" CaptionSettings-HorizontalAlign="Right" ColSpanMd="2">
        <dx:BootstrapLayoutItem Caption="رقم المستند" CaptionSettings-HorizontalAlign="Right" ColSpanMd="2">
        <!-- Search Button -->
        <dx:BootstrapLayoutItem Caption="بحث" CaptionSettings-HorizontalAlign="Right" ColSpanMd="2">
    </Items>
</dx:BootstrapLayoutGroup>
```

#### **2. Unit and Location Selection Section**
```html
<!-- Unit and Location Selection -->
<dx:BootstrapLayoutGroup ShowCaption="False" SettingsItemCaptions-HorizontalAlign="Right" HorizontalAlign="Right" ColSpanMd="12">
    <Items>
        <!-- Storage Unit -->
        <dx:BootstrapLayoutItem Caption="وحدة التخزين" CaptionSettings-HorizontalAlign="Right" ColSpanMd="2">
        <!-- Usage Unit -->
        <dx:BootstrapLayoutItem Caption="وحدة الصرف" CaptionSettings-HorizontalAlign="Right" ColSpanMd="2">
        <!-- Storage Location -->
        <dx:BootstrapLayoutItem Caption="رقم الممر" CaptionSettings-HorizontalAlign="Right" ColSpanMd="2">
        <dx:BootstrapLayoutItem Caption="رقم الرف" CaptionSettings-HorizontalAlign="Right" ColSpanMd="2">
    </Items>
</dx:BootstrapLayoutGroup>
```

#### **3. Operation Buttons Section**
```html
<!-- Operation Buttons -->
<dx:BootstrapLayoutGroup ShowCaption="False" SettingsItemCaptions-HorizontalAlign="Right" HorizontalAlign="Right" ColSpanMd="12">
    <Items>
        <!-- Addition Approval -->
        <dx:BootstrapLayoutItem ShowCaption="False" CaptionSettings-HorizontalAlign="Right" ColSpanMd="2" BeginRow="true">
        <!-- Addition Rejection -->
        <dx:BootstrapLayoutItem ShowCaption="False" CaptionSettings-HorizontalAlign="Right" ColSpanMd="2">
        <!-- Edit and Delete -->
        <dx:BootstrapLayoutItem ShowCaption="False" CaptionSettings-HorizontalAlign="Right" ColSpanMd="3">
        <dx:BootstrapLayoutItem ShowCaption="False" CaptionSettings-HorizontalAlign="Right" ColSpanMd="3">
    </Items>
</dx:BootstrapLayoutGroup>
```

#### **4. Data Grids Section**
```html
<!-- Pending Additions Grid -->
<dx:BootstrapLayoutItem ShowCaption="False" CaptionSettings-HorizontalAlign="Right" ColSpanMd="12">
    <ContentCollection>
        <dx:ContentControl>
            <dx:BootstrapGridView ID="grid_GridView1" runat="server" OnSelectionChanged="grid_GridView1_SelectionChanged1">
<!-- Approved Additions Grid -->
<dx:BootstrapLayoutItem ShowCaption="False" CaptionSettings-HorizontalAlign="Right" ColSpanMd="12">
    <ContentCollection>
        <dx:ContentControl>
            <dx:BootstrapGridView ID="Bootstrap_end_adding" runat="server" OnSelectionChanged="Bootstrap_end_adding_SelectionChanged">
```

### Data Sources and Connectivity

#### **Primary Data Sources**
```csharp
// Pending Additions Data Source
SqlDataSource SqlDataSource7 = new SqlDataSource();
SqlDataSource7.ConnectionString = ConfigurationManager.ConnectionStrings["frontofficeConnectionString"].ConnectionString;
SqlDataSource7.SelectCommand = "SELECT Inventories_Examination_receipt.ID, PO_ID_FK, ss.arabic_name, purches_Supplier_record.Arabic_name as full_Name, Itemcode, Amount, Done_Amount, Remain_Amount, PO_DemandAmount, Price_unit, Total_Price, Discount, Grand_Total, Store_id, Purchase_Id_unit, Inventories_UOM.description, delivery_id_unit, uom.description as uom_deliver_unit, Expiration_date, batch_no, indicator, Emp_code, date_time, fk_check, Examination_done, receipt_done, doc_id, inv_num FROM Inventories_Examination_receipt inner join Inventories_UOM on Inventories_UOM.id=Inventories_Examination_receipt.delivery_id_unit inner join Inventories_UOM as uom on uom.id=Inventories_Examination_receipt.Purchase_Id_unit inner join Purchese_PO_Order_Header on Purchese_PO_Order_Header.id=Inventories_Examination_receipt.PO_ID_FK inner join purches_Supplier_record on purches_Supplier_record.Supplier_code=Purchese_PO_Order_Header.Sup_Code_fk inner join Inventories_Item_Settings ss on ss.item_code=Inventories_Examination_receipt.Itemcode where doc_id=@doc and Examination_done='1' and receipt_done='1' and Adding_indator='0' and Adding_rev_indator='0'";

// Approved Additions Data Source
SqlDataSource SqlDataSource1 = new SqlDataSource();
SqlDataSource1.ConnectionString = ConfigurationManager.ConnectionStrings["frontofficeConnectionString"].ConnectionString;
SqlDataSource1.SelectCommand = "SELECT distinct Inventories_Examination_receipt.ID, PO_ID_FK, purches_Supplier_record.Arabic_name as full_Name, Itemcode, Amount, Done_Amount, Remain_Amount, PO_DemandAmount, Price_unit, Total_Price, Discount, Grand_Total, Inventories_Examination_receipt.Store_id, Purchase_Id_unit, Inventories_UOM.description, delivery_id_unit, uom.description as uom_deliver_unit, Expiration_date, batch_no, indicator, Emp_code, date_time, fk_check, Examination_done, receipt_done, doc_id, inv_num, Inventories_wharehouse_passage.english_name as passage_id, Inventories_wharehouse_Racks.english_name as shelf_id, storage_Id_unit, Exchange_id_unit, uom1.description as uom_storage_unit, uom2.description as uom_Exchange_unit, Inventories_UOM_item_unit.Quantity*uom_unit1.Quantity*Done_Amount as delivery_q, Inventories_UOM_item_unit.Quantity * uom_unit1.Quantity * uom_unit2.Quantity * Done_Amount as storage_q, Inventories_UOM_item_unit.Quantity * uom_unit1.Quantity * uom_unit2.Quantity * uom_unit3.Quantity * Done_Amount as exchange_q, null as NUM, Inventories_Item_Settings.arabic_name FROM Inventories_Examination_receipt inner join Inventories_UOM on Inventories_UOM.id = Inventories_Examination_receipt.delivery_id_unit left join Inventories_UOM_item_unit on Inventories_UOM_item_unit.unit_id = Inventories_UOM.id and Itemcode = Inventories_UOM_item_unit.item_code and unit_type_id = 2 inner join Inventories_UOM as uom on uom.id = Inventories_Examination_receipt.Purchase_Id_unit left join Inventories_UOM_item_unit as uom_unit1 on uom_unit1.unit_id = uom.id and Itemcode = uom_unit1.item_code and uom_unit1.unit_type_id = 1 inner join Inventories_UOM as uom1 on uom1.id = Inventories_Examination_receipt.storage_Id_unit left join Inventories_UOM_item_unit as uom_unit2 on uom_unit2.unit_id = uom1.id and Itemcode = uom_unit2.item_code and uom_unit2.unit_type_id = 3 inner join Inventories_UOM as uom2 on uom2.id = Inventories_Examination_receipt.Exchange_id_unit left join Inventories_UOM_item_unit as uom_unit3 on uom_unit3.unit_id = uom2.id and Itemcode = uom_unit3.item_code and uom_unit3.unit_type_id = 4 inner join Purchese_PO_Order_Header on Purchese_PO_Order_Header.id=Inventories_Examination_receipt.PO_ID_FK inner join purches_Supplier_record on purches_Supplier_record.Supplier_code=Purchese_PO_Order_Header.Sup_Code_fk left join Inventories_wharehouse_passage on Inventories_wharehouse_passage.id=Inventories_Examination_receipt.passage_id left join Inventories_wharehouse_Racks on Inventories_wharehouse_Racks.id=Inventories_Examination_receipt.shelf_id inner join Inventories_Item_Settings on Inventories_Item_Settings.item_code=Inventories_Examination_receipt.Itemcode where Examination_done='1' and receipt_done='1' and Adding_indator='1' and Adding_rev_indator='0' and doc_id=@doc";

// Storage Unit Data Source
SqlDataSource SqlDataSource2 = new SqlDataSource();
SqlDataSource2.ConnectionString = ConfigurationManager.ConnectionStrings["frontofficeConnectionString"].ConnectionString;
SqlDataSource2.SelectCommand = "select Inventories_UOM.id, Inventories_UOM.description, Inventories_UOM_item_unit.Quantity from Inventories_UOM inner join Inventories_UOM_item_unit on Inventories_UOM.id = Inventories_UOM_item_unit.unit_id where unit_type_id='3' and item_code=@itemcode and (Inventories_UOM.active = 1)";

// Usage Unit Data Source
SqlDataSource SqlDataSource3 = new SqlDataSource();
SqlDataSource3.ConnectionString = ConfigurationManager.ConnectionStrings["frontofficeConnectionString"].ConnectionString;
SqlDataSource3.SelectCommand = "select Inventories_UOM.id, Inventories_UOM.description, Inventories_UOM_item_unit.Quantity from Inventories_UOM inner join Inventories_UOM_item_unit on Inventories_UOM.id = Inventories_UOM_item_unit.unit_id where unit_type_id='4' and item_code=@itemcode and (Inventories_UOM.active = 1)";

// Passage Data Source
SqlDataSource SqlDataSource4 = new SqlDataSource();
SqlDataSource4.ConnectionString = ConfigurationManager.ConnectionStrings["frontofficeConnectionString"].ConnectionString;
SqlDataSource4.SelectCommand = "select distinct Inventories_wharehouse_passage.id, Inventories_wharehouse_passage.english_name from Inventories_wharehouse_store inner join Inventories_wharehouse_passage on Inventories_wharehouse_store.id=Inventories_wharehouse_passage.Store_id where Store_id=@store_id and Inventories_wharehouse_passage.active='1'";

// Shelf Data Source
SqlDataSource SqlDataSource33 = new SqlDataSource();
SqlDataSource33.ConnectionString = ConfigurationManager.ConnectionStrings["frontofficeConnectionString"].ConnectionString;
SqlDataSource33.SelectCommand = "select id, english_name from Inventories_wharehouse_Racks where passage_id=@passive_id and Inventories_wharehouse_Racks.active='1'";
```

## Business Logic and Validation

### Document Search Validation

```csharp
protected void search_Click(object sender, EventArgs e)
{
    if (txt_doc_no.Text == "")
    {
        ScriptManager.RegisterStartupScript(this, GetType(), "Notice", "alert('الرجاء ادخال رقم المستند ');", true);
        return;
    }
    else
    {
        SqlDataSource7.SelectParameters["doc"].DefaultValue = txt_doc_no.Text;
        SqlDataSource1.SelectParameters["doc"].DefaultValue = txt_doc_no.Text;
        grid_GridView1.DataBind();
        grid_GridView1.Selection.UnselectAll();
        Bootstrap_end_adding.DataBind();
        Bootstrap_end_adding.Selection.UnselectAll();
    }
}
```

**Search Logic**: Validates document number before retrieving records
**Data Binding**: Binds both pending and approved addition grids
**Selection Logic**: Clears all selections after search for clean state

### Unit Selection Validation

```csharp
protected void Adding_Click(object sender, EventArgs e)
{
    if (storage_unit.Value == "" || storage_unit.Value == null)
    {
        ScriptManager.RegisterStartupScript(this, GetType(), "Notice", "alert('الرجاء ادخال وحدة التخزين ');", true);
        return;
    }
    else if (usage_unit.Value == "" || usage_unit.Value == null)
    {
        ScriptManager.RegisterStartupScript(this, GetType(), "Notice", "alert('الرجاء ادخال وحدة الصرف ');", true);
        return;
    }
    // ... addition logic
}
```

**Unit Logic**: Validates both storage and usage units are selected
**Error Prevention**: Prevents addition approval without proper unit assignment
**User Feedback**: Provides clear Arabic error messages for validation failures

### Addition Approval Logic

```csharp
protected void Adding_Click(object sender, EventArgs e)
{
    if (passive_id.Value == "" || passive_id.Value == null || Shelf.Value == "" || Shelf.Value == null)
    {
        cn.ExcuteSQL("update Inventories_Examination_receipt set Inventories_Examination_receipt.Adding_indator = '1', Inventories_Examination_receipt.Adding_user = '" + user + "', Inventories_Examination_receipt.Adding_date='" + DateTime.Now.Date.ToString("yyyy-MM-dd") + "', storage_Id_unit='" + storage_unit.Value.ToString() + "' ,Exchange_id_unit='" + usage_unit.Value.ToString() + "' where Inventories_Examination_receipt.ID ='" + ID.Text + "' ");
    }
    else
    {
        cn.ExcuteSQL("update Inventories_Examination_receipt set Inventories_Examination_receipt.Adding_indator = '1', Inventories_Examination_receipt.Adding_user = '" + user + "', Inventories_Examination_receipt.Adding_date='" + DateTime.Now.Date.ToString("yyyy-MM-dd") + "', storage_Id_unit='" + storage_unit.Value.ToString() + "' ,Exchange_id_unit='" + usage_unit.Value.ToString() + "',passage_id='" + passive_id.Value.ToString() + "',shelf_id='" + Shelf.Value.ToString() + "' where Inventories_Examination_receipt.ID ='" + ID.Text + "' ");
    }
    // ... success feedback
}
```

**Approval Logic**: Updates addition status to approved with user tracking
**Location Logic**: Optionally records passage and shelf location
**User Tracking**: Records user code and timestamp for audit trail

### Rejection Logic with Quantity Reversal

```csharp
protected void reject_Click(object sender, EventArgs e)
{
    cn.ExcuteSQL("update Inventories_Examination_receipt set Inventories_Examination_receipt.Adding_indator = '2', Inventories_Examination_receipt.Adding_user = '" + user + "', Inventories_Examination_receipt.Adding_date='" + DateTime.Now.Date.ToString("yyyy-MM-dd") + "' where Inventories_Examination_receipt.ID ='" + ID.Text + "' ");
    
    cn.ExcuteSQL("update Purchese_PO_Order_Details set Purchese_PO_Order_Details.Done_Amount = Purchese_PO_Order_Details.Done_Amount - Inventories_Examination_receipt.Done_Amount, Purchese_PO_Order_Details.Remain_Amount = Purchese_PO_Order_Details.Remain_Amount + Inventories_Examination_receipt.Done_Amount from Inventories_Examination_receipt where Purchese_PO_Order_Details.PO_ID_FK = Inventories_Examination_receipt.PO_ID_FK and Purchese_PO_Order_Details.itemcode = Inventories_Examination_receipt.Itemcode and Inventories_Examination_receipt.ID = '" + ID.Text + "' ");
    // ... success feedback
}
```

**Rejection Logic**: Updates addition status to rejected with user tracking
**Quantity Logic**: Reverses quantity allocation in PO order details
**Audit Trail**: Maintains complete tracking of rejection actions

### Edit Operation Logic

```csharp
protected void edit_adding_Click(object sender, EventArgs e)
{
    cn.ExcuteSQL("update Inventories_Examination_receipt set Inventories_Examination_receipt.Adding_indator = '1', Inventories_Examination_receipt.Adding_user = '" + user + "', Inventories_Examination_receipt.Adding_date='" + DateTime.Now.Date.ToString("yyyy-MM-dd") + "', storage_Id_unit='" + storage_unit.Value.ToString() + "' ,Exchange_id_unit='" + usage_unit.Value.ToString() + "',passage_id='" + passive_id.Text + "',shelf_id='" + Shelf.Text + "' where Inventories_Examination_receipt.ID ='" + ID_temp.Text + "' ");
    
    Adding.Enabled = true;
    reject.Enabled = true;
    edit_adding.Enabled = false;
    delete_adding.Enabled = false;
    passive_id.Text = Shelf.Text = storage_unit.Text = usage_unit.Text = "";
    // ... success feedback
}
```

**Edit Logic**: Updates approved addition with new unit and location assignments
**Button Logic**: Resets button states to prevent conflicts
**Form Logic**: Clears form fields after successful edit

## Error Handling and User Feedback

### Client-Side Validation

#### **Required Field Validation**
- **Document Number Validation**: Must enter document number for search operations
- **Unit Selection Validation**: Must select both storage and usage units for addition
- **Record Selection Validation**: Must select record before performing operations
- **Field-specific Errors**: Specific error messages for each validation failure type

#### **User Feedback**
- **Arabic Error Messages**: Clear, localized error messages for common validation failures
- **Real-time Validation**: Immediate feedback when invalid data is entered
- **Processing Feedback**: Button text changes during operation processing
- **Success Indicators**: Grid updates and data display confirm successful operations

### Server-Side Validation

#### **Business Rule Validation**
- **Document Validation**: Ensures document exists and has eligible records
- **Record Status Validation**: Ensures records are in proper status for operations
- **Unit Association Validation**: Ensures units are properly associated with items
- **Location Validation**: Ensures passages and shelves are active and valid

#### **Permission Validation**
- **User Authentication**: Validates user is logged in with valid authentication cookies
- **Department Access**: Ensures user has access to department data
- **Operation Permissions**: Validates user has permission for addition operations
- **Record Access**: Ensures user can access and modify selected records

#### **Exception Handling**
- **Database Connection**: Handles database connection failures gracefully
- **Data Retrieval**: Manages data retrieval errors with appropriate user feedback
- **Update Operations**: Handles update failures with clear error messages
- **General Exceptions**: Catches and logs unexpected errors

### Success Indicators

#### **Toastr Notifications**
- **Search Success**: Grid updates with filtered results after successful search
- **Addition Success**: "تم تاكيد اذن الاضافة" (Addition confirmed successfully)
- **Rejection Success**: "تم رفض اذن الاضافة" (Addition rejected successfully)
- **Edit Success**: "تم تعديل اذن الاضافة" (Addition edited successfully)
- **Delete Success**: "تم حذف اذن الاضافة" (Addition deleted successfully)

#### **UI Updates**
- **Grid Refresh**: Automatic refresh of both pending and approved addition grids
- **Selection Clearing**: Automatic clearing of selections after operations
- **Button State Updates**: Buttons enable/disable based on selection state
- **Form Clearing**: Form fields clear after successful operations

## Integration Points

### External Systems

#### **Inventory Management System**
- **Database Tables**:
  - `Inventories_Examination_receipt` - Examination and receipt records with addition workflow
  - `Inventories_UOM` - Unit of measure master data with conversion factors
  - `Inventories_UOM_item_unit` - Item-unit associations with conversion factors
  - `Purchese_PO_Order_Details` - Purchase order quantity allocations
- **Integration Details**:
  - Unit conversion calculations for different measurement types
  - Quantity allocation and reversal for addition/rejection operations
  - Storage location management with passage and shelf assignments
  - Audit trail maintenance for all addition operations
- **Data Flow**:
  - Pending additions filtered by examination and receipt completion
  - Unit associations loaded based on item code and unit types
  - Location data loaded based on store and passage relationships
  - Quantity calculations performed using conversion factors

#### **User Management System**
- **Authentication Details**:
  - **Cookies**: `Request.Cookies["user"]` with fields: code, name, dep
  - **User Context**: Retrieved via `userinfo["code"].ToString()`
  - **Department Assignment**: Retrieved via SQL query on DefinitionEmployee1 table
- **Database Tables**:
  - `DefinitionDep` table with fields: DepID, Dep_Name
  - `DefinitionEmployee1` table with fields: EmpID, EmpDepartment
  - Connection string: `BackOffice_CS`
- **Permission System**:
  - Department-based access control enforced at database level
  - User authentication required for all addition operations
  - Department auto-population based on user profile

#### **Purchase Order System**
- **Database Tables**:
  - `Purchese_PO_Order_Header` - Purchase order header with supplier information
  - `Purchese_PO_Order_Details` - Purchase order details with quantity allocations
  - `purches_Supplier_record` - Supplier master data
- **Integration Details**:
  - Purchase order information displayed in addition grids
  - Quantity allocations reversed on addition rejection
  - Supplier information linked to addition records
- **Data Flow**:
  - PO header linked to examination receipt records
  - Supplier information displayed for reference
  - Quantity allocations tracked and managed

#### **Warehouse Management System**
- **Database Tables**:
  - `Inventories_wharehouse_passage` - Warehouse passage master data
  - `Inventories_wharehouse_Racks` - Warehouse rack/shelf master data
- **Integration Details**:
  - Storage location management with passage and shelf assignments
  - Location filtering based on store associations
  - Active location validation for proper assignment
- **Data Flow**:
  - Passages filtered by store ID
  - Shelves filtered by passage ID
  - Location assignments stored in addition records

### Data Exchange

#### **Unit Conversion Information**
- **Database Tables**:
  - `Inventories_UOM` - Unit master data with active status
  - `Inventories_UOM_item_unit` - Item-unit associations with conversion factors
- **Real-time Data**:
  - Unit conversion factors for quantity calculations
  - Unit type associations (delivery, purchase, storage, exchange)
  - Active unit status and availability
- **Data Relationships**:
  - Unit filtering by unit_type_id (2=delivery, 1=purchase, 3=storage, 4=exchange)
  - Conversion factor calculations for quantity transformations
  - Item-unit associations for proper unit selection

#### **Storage Location Information**
- **Database Tables**:
  - `Inventories_wharehouse_passage` - Passage master data with store associations
  - `Inventories_wharehouse_Racks` - Shelf/rack master data with passage associations
- **Real-time Data**:
  - Active passage and shelf availability
  - Store-passage relationships for filtering
  - Passage-shelf relationships for hierarchical selection
- **Data Relationships**:
  - Passage filtering by store ID
  - Shelf filtering by passage ID
  - Location assignment to addition records

#### **Addition Workflow Information**
- **Database Tables**:
  - `Inventories_Examination_receipt` - Addition workflow with status tracking
  - `Purchese_PO_Order_Details` - Quantity allocation tracking
- **Real-time Data**:
  - Addition status (pending=0, approved=1, rejected=2)
  - User and timestamp tracking for audit trail
  - Quantity allocation and reversal operations
- **Data Relationships**:
  - Status-based filtering for pending vs approved additions
  - User tracking for accountability
  - Quantity management for inventory accuracy

#### **Supplier Information**
- **Database Tables**:
  - `Purchese_PO_Order_Header` - PO header with supplier code
  - `purches_Supplier_record` - Supplier master data
- **Real-time Data**:
  - Supplier names and codes for display
  - Supplier associations with purchase orders
  - Supplier information in addition records
- **Data Relationships**:
  - Supplier code linking in PO headers
  - Supplier name display in addition grids
  - Supplier information for reference and tracking

## Troubleshooting Guide

### Common Issues and Solutions

#### **"الرجاء ادخال رقم المستند" Error**
- **Cause**: Document number not entered before clicking search
- **Solution**: Always enter document number before clicking search button
- **Prevention**: Document number is required for all operations

#### **"الرجاء ادخال وحدة التخزين" Error**
- **Cause**: Storage unit not selected before clicking addition approval
- **Solution**: Select storage unit from dropdown before clicking approval
- **Prevention**: Ensure item has proper unit associations in UOM tables

#### **"الرجاء ادخال وحدة الصرف" Error**
- **Cause**: Usage unit not selected before clicking addition approval
- **Solution**: Select usage unit from dropdown before clicking approval
- **Prevention**: Ensure item has proper unit associations in UOM tables

#### **"الرجاء اختيار السطر" Error**
- **Cause**: No record selected before performing operations
- **Solution**: Select record from grid before clicking operation buttons
- **Prevention**: System enforces single row selection only

#### **No Results Displayed After Search**
- **Cause**: Document number incorrect or no eligible records exist
- **Solution**: Verify document number and check for examination/receipt completion
- **Prevention**: Ensure examination and receipt workflow is completed

#### **Unit Dropdown Empty**
- **Cause**: Item has no unit associations or units inactive
- **Solution**: Verify item has proper UOM associations and units are active
- **Prevention**: Ensure item master data includes unit associations

#### **Location Selection Issues**
- **Cause**: Store not selected or locations inactive
- **Solution**: Verify store selection and location active status
- **Prevention**: Ensure warehouse location data is current and active

### System Requirements

#### **Browser Requirements**
- **Modern Browser**: Chrome, Firefox, Safari, or Edge with JavaScript enabled
- **JavaScript**: Required for grid functionality and client-side validation
- **Cookies**: Required for user authentication and session management
- **Screen Resolution**: Minimum 1024x768 for proper grid display

#### **Permissions Requirements**
- **User Authentication**: Valid login with user code in cookies
- **Addition Approval Access**: Access to addition approval operations
- **Department Access**: Access to department-specific data
- **Warehouse Access**: Access to storage location data

#### **Network Requirements**
- **Database Connection**: Stable connection to frontoffice database
- **Network Speed**: Adequate speed for grid loading and data retrieval
- **Firewall**: Access to database servers and web application

#### **Training Requirements**
- **Inventory Addition Workflow**: Understanding of examination, receipt, and addition processes
- **Unit Conversion**: Knowledge of unit types and conversion factors
- **Storage Location Management**: Familiarity with warehouse passage and shelf systems
- **Approval Operations**: Understanding of addition approval, rejection, edit, and delete operations

## Usage Examples

### Basic Addition Approval Workflow

1. **Page Load**: Verify department and employee are auto-selected
2. **Document Entry**: Enter document number for examination receipt records
3. **Search Execution**: Click search to load pending addition records
4. **Record Review**: Review examination and receipt completion status
5. **Unit Selection**: Select storage and usage units for item
6. **Location Assignment**: Optionally select passage and shelf location
7. **Addition Approval**: Click approval button to confirm addition
8. **Grid Update**: Verify record moved to approved additions grid

### Addition Rejection Workflow

1. **Document Search**: Enter document number and search for records
2. **Record Selection**: Select record that needs rejection
3. **Rejection Operation**: Click reject button to reject addition
4. **Quantity Reversal**: Verify quantity allocation is reversed in PO details
5. **Status Update**: Confirm addition status changed to rejected
6. **Grid Refresh**: Verify record status updated in grid

### Addition Edit Workflow

1. **Document Search**: Enter document number and search for records
2. **Approved Records**: Review approved additions in second grid
3. **Record Selection**: Select approved record for editing
4. **Unit Changes**: Modify storage or usage unit assignments
5. **Location Changes**: Modify passage or shelf assignments
6. **Edit Operation**: Click edit button to update addition
7. **Confirmation**: Verify changes applied and record updated

### Addition Delete Workflow

1. **Document Search**: Enter document number and search for records
2. **Approved Records**: Review approved additions in second grid
3. **Record Selection**: Select approved record for deletion
4. **Delete Operation**: Click delete button to reset addition status
5. **Status Reset**: Confirm addition status reset to pending
6. **Grid Update**: Verify record moved back to pending additions grid
